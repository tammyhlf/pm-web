import request, {api} from '@/utils/request';

export async function addDebet(params) {
  return request(api + '/debet/add', {
    method: 'POST',
    data: params,
  });
}

export async function totalDebet(params) {
  return request(api + '/debet/total', {
    method: 'GET',
    params: params,
  });
}

export async function debetInfo(params) {
  return request(api + '/debet/', {
    method: 'GET',
    params: params,
  });
}

export async function deleteInfo(params) {
  return request(api + '/debet/delete', {
    method: 'POST',
    data: params,
  });
}