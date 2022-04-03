import { METHOD_GET } from '@lib/controller';
import * as authService from '@services/authService'
export const tags = ['01.2.메타마스크 로그인'];
export const summary = '링크';

export const request = {
  path: '/nft/image',
  method: METHOD_GET,
};

export const security = ['any'];

export const params = {
    path: {},
    query: { },
};

export const execute = async ({ params }) => {
};

export default execute;