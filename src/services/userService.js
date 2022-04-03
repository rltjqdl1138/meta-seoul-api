import md5 from 'crypto-js/md5';
import * as userDto from '@vo/userDto'

const AVATAR_MAP = {}
export const getUser = async(params, client)=>{
    const address = params.address.search('0x') ? params.address : params.address.slice(2,)
    const user = await userDto.getUser(address)
    return user
}

export const saveData = async(params, client, data)=>{
    const address = params.address.search('0x') ? params.address : params.address.slice(2,)
    const {seq} = client
    const user = await userDto.getUser(address)

    const KEY = md5(JSON.stringify({client:seq,user:user.seq})).toString();

    AVATAR_MAP[KEY] = data
}

export const loadData = async(params, client)=>{
    const address = params.address.search('0x') ? params.address : params.address.slice(2,)
    const {seq} = client
    const user = await userDto.getUser(address)

    const KEY = md5(JSON.stringify({client:seq,user:user.seq})).toString();

    return AVATAR_MAP[KEY] 
}