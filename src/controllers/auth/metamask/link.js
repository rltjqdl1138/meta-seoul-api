import { METHOD_POST } from '@lib/controller';
import * as authService from '@services/authService'
export const tags = ['01.2.메타마스크 로그인'];
export const summary = '링크';

export const request = {
  path: '/link/metamask',
  method: METHOD_POST,
};

export const security = ['any'];

export const params = {
    path: {},
    query: { },
};

export const execute = async ({ params }) => {
};

export default execute;