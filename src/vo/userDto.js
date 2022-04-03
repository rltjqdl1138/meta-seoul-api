import mysql from './mysql'
const query = mysql.query

export const getUserBySeq= async(seq)=>{
  const list = await query('SELECT * FROM user WHERE seq=?',[seq]) || []
  return list[0]
}

export const getUser= async(uid)=>{
    const list = await query('SELECT * FROM user WHERE uid=?',[uid]) || []
    return list[0]
}

export const getKakaoUser= async(seq)=>{
  const list = await query('SELECT * FROM kakao_user WHERE user_seq=?',[seq]) || []
  return list[0]
}

export const registerUser = async(args)=>{
  const {uid, address} = args
  await query('INSERT INTO user SET uid=?, address=?',[uid, address])
  return getUser(uid)
}

export const registerKakaoUser = async(args)=>{
  const {user_seq, profile_image_url, nickname, connected_at} = args
  await query('INSERT INTO kakao_user SET user_seq=?, profile_image_url=?, nickname=?, connected_at=?',[user_seq, profile_image_url, nickname, connected_at])
  return getKakaoUser(user_seq)
}
