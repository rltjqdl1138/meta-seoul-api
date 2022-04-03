import mysql from './mysql'
const query = mysql.query

export const getCloseArea= async(lng, lat)=>{
  const [result] = await query(`CALL get_close_areas(${lng},${lat})`)
  return result
}

export const registerWithProcedure = async(args)=>{
  const {token_id, contract_id, creator_address, owner_address, name, description, image_url, opensea_link, type} = args
  return query(
    `CALL insert_nft(?,?,?,?,?,?,?,?,?,@a)`,
    [token_id, contract_id, creator_address, owner_address, name, description, image_url, opensea_link, type]
  )
}

export const getAreaItem = async(id) =>{
  const result = await query(`SELECT * FROM nft_etherscan WHERE seq=?`,[id])
  return result[0]
}

export const getImageListByUser = async({address})=>{
  const result = await query(`CALL my_nft_images(?)`,[address])
  return result[0]
}

export const getImageList = async({limit, page})=>{
  const skip = limit*(page-1)
  const resultPromise = query(`CALL get_nft_images_with_page(?,?)`,[skip,limit])
  const countPromise = query(`SELECT get_nft_images_count() AS total`)
  const [list] = await resultPromise
  const [count] = await countPromise
  return {list, ...count}
}