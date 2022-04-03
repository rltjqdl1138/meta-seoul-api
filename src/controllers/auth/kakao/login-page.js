import { METHOD_GET } from '@lib/controller';
import * as authService from '@services/authService'
export const tags = ['01.1.카카오 로그인'];
export const summary = '로그인 페이지';

export const request = {
  path: '/auth/kakao/login-page',
  method: METHOD_GET,
};

export const security = ['any'];
export const params = {
  path: {},
  query: {},
};

export const execute = async (req, res, next) => {
  const url = authService.kakaoAuthLoginPage()
  return res.redirect(url)
};

export default execute;