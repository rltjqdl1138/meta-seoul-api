import { METHOD_GET } from '@lib/controller';
import * as authService from '@services/authService'
export const tags = ['01.1.카카오 로그인'];
export const summary = '로그인';

export const request = {
  path: '/auth/kakao/login',
  method: METHOD_GET,
};

export const security = ['any'];
export const params = {
  path: {},
  query: {},
};

export const execute = async ({ params }) => {
  console.log(params)
  await authService.kakaoAuthLogin(params)
};

export default execute;