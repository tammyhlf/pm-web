import request, {api} from '@/utils/request';

export async function save(params) {
  return request(api + '/save', {
    method: 'POST',
    data: params,
  });
}

export async function star(params) {
  return request(api + '/save/star', {
    method: 'GET',
    params: params,
  });
}