import request, {api} from '@/utils/request';

export async function userLogin(params) {
  return request(api + '/users/signin', {
    method: 'POST',
    data: params,
  });
}

export async function userRegister(params) {
  return request(api + '/users/signup', {
    method: 'POST',
    data: params,
  });
}
