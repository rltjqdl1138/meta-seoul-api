
import passport from 'passport';
import jwt from 'jsonwebtoken'
import axios from 'axios'
import qs from 'qs';
import fetch from 'node-fetch'

import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import {recoverPersonalSignature} from 'eth-sig-util'
import * as userDto from '@vo/userDto'
import crypto from 'crypto'

const METAMASK = 1
const PASSWORD = "AAAAB3NzaC1yc2EAAAABJQAAAQEA1TE//ahk4phqCAWoTaCRw+KHcKv5/xB/gCBrue6ffxoBMPvG54eBLC3BpDFV9XzJ8t/3NybZ+QUVYu5Iy2+SgMOX5HvWy8AHgIbVc/hVnYK5r6Bv2hom89IDirMjbfZQE4zwCihOROQQqQYiimEdviR5+P1w40cbm5/n79RKvZkr/fnOjMWjjeT1qdXkIC9H2GQhag8GTLTyLG4uAvt19ffc6hdJLqTr4f6Y3RSKkauCe1LpzqEhbuoaoqKtLoW5G0U/+9p4hUJw0TfIqkxrzn9lzArEBszzP2piOwil1Zoykxoy5EaGZvm8A50PgJvHL2ctkTWyfbeFNTJm8qK8PQ=="

/*
 * @ 1.3. Jwt callback function
 * @function jwt_callback
 *   @writer - Kim ki seop
 *   @description - Verify jwt token and get User data
 *   @params {Object} - payload
 *     @property {Integer} id - Unique numeric id
 *     @property {Datetime} iat - Time to sign this token,
 *                                If iat is lower than user.expired_at, Server judge that token is signed before critical info is changed
 *   @return {Object} User
**/
export const jwt_callback = async (payload, done) => {
    try{
        const user = await userDto.getUserBySeq(payload.seq)
        // Case 1: User is not exist
        if(!user)
          return done({ message: 'Incorrect email or password' })
    
        // Case 2: Token is expired
        const expireDate = Math.floor(user.expired_at / 1000)
        if(payload.iat < expireDate){
          return done({ message: 'Expired jwt' })
        }
        // Case 3: Success
        done(null, user)
    }catch(e){
      console.log(e)
      // Case 4: Trouble in loading data
      done({ message:'Database is down' })
    }
}

/*
 * @ 1.4. PassportSetting
 *   @writer - Kim ki seop
 *   @description - Set passport setting ( Bearer, JWT callback )
**/
export const jwt_config = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:    PASSWORD,
};
passport.use('jwt', new JwtStrategy(jwt_config, jwt_callback));


export const authMetamask = async (params)=>{
  const {sign} = params

  let nonce = "asdfasdf"
  nonce = "\x19Example `personal_sign` message\n" + nonce.length + nonce

  const exampleMessage = 'Landmarkers 로그인';
  const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
  const address = recoverPersonalSignature({
    data: msg,
    sig: sign,
  });

  const user= await userDto.getUser(address, METAMASK) ||
              await userDto.registerUser({address, type:METAMASK})
  const access_token = jwt.sign({seq: user.seq}, PASSWORD, {expiresIn:'1d'})

  return {
    access_token
  }
}

const PASSWORD_CRYPTO_KEY = "landmarkers&openavatar"
const PASSWORD_CRYPTO_COUNT = 10764

const hashClientKey = (password, salt ) => new Promise((resolve, reject)=>{
  crypto.pbkdf2(
    password, // Raw password
    salt.toString('base64'),  // Salt (Crypto Key)
    PASSWORD_CRYPTO_COUNT,    // Hashing count
    64,       // length
    'sha512', // method
  (err,buf) => err ? reject(err) : resolve(buf.toString('base64')) )
})
const createPassword = async (password, clientID)=>{
  const salt = clientID.toString(16)+'!'+'3dfactory'+'@'+PASSWORD_CRYPTO_KEY
  const crypto_password = await hashClientKey(password, salt)
  return crypto_password
}
const HOST = "http://1.221.216.110:8100"
const LOGIN_URL = "https://kauth.kakao.com/oauth/authorize"
const LOGOUT_URL = "https://kauth.kakao.com/oauth/logout"
const CLIENT_ID = "379993434257f68df05bd2f9d2e4416a"
const LOGIN_REDIRECT = "/v1/auth/kakao/login"
const LOGOUT_REDIRECT = "/v1/auth/kakao/logout"
const RESPONSE_TYPE = "code"
//"https://kauth.kakao.com/oauth/token"
//"https://kapi.kakao.com/v2/user/me"


export const kakaoAuthLogin = async ({code})=>{
  const {access_token} = await getAccessTokenFromKakao(code)
  const data = await getDataFromKakao(access_token)
  console.log(data)
  
}

export const kakaoAuthLogout = (params)=>{

}

export const kakaoAuthLoginPage = ()=>{
  const pageURL = LOGIN_URL+'?' + [`client_id=${CLIENT_ID}`,`redirect_uri=${HOST}${LOGIN_REDIRECT}`, `response_type=${RESPONSE_TYPE}`].join('&')
  return pageURL;
}

const kakaoAuthLogoutPage = ()=>{
  const pageURL = LOGOUT_URL+'?' + [`client_id=${CLIENT_ID}`,`redirect_uri=${HOST}${LOGOUT_REDIRECT}`, `response_type=${RESPONSE_TYPE}`].join('&')
  return pageURL;
}

const linkMetamask = ()=>{

}

const getAccessTokenFromKakao = async(code)=>{
  const body = {
      "grant_type":   "authorization_code",
      "client_id":    CLIENT_ID,
      "redirect_uri": `http://1.221.216.110:${8100}/v1/auth/kakao/login`,
      "code":         code
  }

  const response = await fetch('https://kauth.kakao.com/oauth/token',{
      method: 'post',
      body: qs.stringify(body),
      headers:{ 'Content-type':"application/x-www-form-urlencoded;charset=utf-8" }
  })
  const data = await response.json()
  return data
}


const getDataFromKakao = async(accessToken)=>{
    
  const response = await fetch('https://kapi.kakao.com/v2/user/me',{
      method: 'get',
      headers:{
          'Content-type':"application/x-www-form-urlencoded;charset=utf-8",
          'Authorization': `Bearer ${accessToken}`
      }
  })
  const data = await response.json()
  return data
}