import request, {api} from '@/utils/request';

export async function book(params) {
  return request(api + '/book', {
    method: 'POST',
    data: params,
  });
}

export async function bookInfo(params) {
  return request(api + '/book/info', {
    method: 'GET',
    params: params,
  });
}

export async function deleteInfo(params) {
  return request(api + '/book/delete', {
    method: 'POST',
    data: params,
  });
}
