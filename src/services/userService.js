
import axios from 'axios'
import * as userDto from '@vo/userDto'

const URL = "http://1.221.216.110:8010"
export const saveData = async(params, user, data)=>{
  const headers = {
    "content-type":"application/json",
    "client-id":"12750374",
    "api-key":"pPDoVNYUS0R5d/zLXvAZ7BJD4SjIQpDsA1LOR1IVt3QtmVoD6EI5jiICY3gfi9llJ47WHXCLDzryamY7Bwgnrw==",
  }
  const {data:avatarData} = await axios.post(`${URL}/v1/user/${user.address}/data/${params.key}`, data, {headers})
  return avatarData
}

export const loadData = async(params, user)=>{
  const headers = {
    "content-type":"application/json",
    "client-id":"12750374",
    "api-key":"pPDoVNYUS0R5d/zLXvAZ7BJD4SjIQpDsA1LOR1IVt3QtmVoD6EI5jiICY3gfi9llJ47WHXCLDzryamY7Bwgnrw==",
  }
  const {data:avatarData} = await axios.get(`${URL}/v1/user/${user.address}/data/${params.key}`, {headers})
  return avatarData
}

export const getMyData = async(params, user)=>{
  const kakao = await userDto.getKakaoUser(user.seq)
  return { ...user, kakao:convertKakao(kakao) }
}

const convertKakao = (data)=>{
  const {profile_image_url, nickname, connected_at, email} = data
  return {
    email,
    nickname,
    connectedAt: connected_at,
    profileImageUrl: profile_image_url,
  }
}