import mysql from './mysql'
const query = mysql.query

export const getUser= async(address)=>{
    const list = await query('SELECT * FROM ether_user WHERE wallet_address=?',[address]) || []
    return list[0]
}

export const getUserBySeq= async(seq)=>{
    const list = await query('SELECT * FROM ether_user WHERE seq=?',[seq]) || []
    return list[0]
}


export const registerUser = async(args)=>{
    const {address, type} = args
    await query('INSERT INTO ether_user SET wallet_address=?, wallet_type=?',[address, type])
    return getUser(address, type)
}