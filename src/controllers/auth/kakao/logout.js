import { METHOD_GET } from '@lib/controller';
export const tags = ['01.1.카카오 로그인'];
export const summary = '로그아웃';

export const request = {
  path: '/auth/kakao/logout',
  method: METHOD_GET,
};

export const security = ['any'];
export const params = {
  path: {},
  query: {},
};

export const execute = async ({ params }) => {

};

export default execute;