import { METHOD_GET } from '@lib/controller';
import * as userService from '@services/userService'
export const tags = ['02.1.로그인'];
export const summary = '(소셜로그인 미완성) 로그인';

export const request = {
  path: '/user/data/{key}',
  method: METHOD_GET,
};

export const security = ['any'];
export const params = {
    path: {
      key:{type:'string'}
    },
    query: {},
};

export const execute = async ({ params }) => {

};

export default execute;