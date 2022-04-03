import axios from 'axios'

const URL = "http://1.221.216.110:8020"
export const getNFTImage = async (params)=>{  
  const {limit, page} = params
  const query = `limit=${limit}&page=${page}`
  const {data} = await axios.get(`${URL}/v1/nft/image?${query}`)
  return data
}

export const linkMetamask = async(params, user)=>{
  const {data} = await axios.post(`${URL}/v1/auth/metamask?sign=${params.sign}`)
  // update user
  
}