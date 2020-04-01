import request, {api} from '@/utils/request';

export async function addAssets(params) {
  return request(api + '/assets/add', {
    method: 'POST',
    data: params,
  });
}

export async function totalAssets(params) {
  return request(api + '/assets/total', {
    method: 'GET',
    params: params,
  });
}

export async function assetsInfo(params) {
  return request(api + '/assets/', {
    method: 'GET',
    params: params,
  });
}

export async function deleteInfo(params) {
  return request(api + '/assets/delete', {
    method: 'POST',
    data: params,
  });
}