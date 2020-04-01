import request, {api} from '@/utils/request';

export async function saveStar(params) {
  return request(api + '/save', {
    method: 'POST',
    data: params,
  });
}

export async function getStar(params) {
  return request(api + '/save/star', {
    method: 'GET',
    params: params,
  });
}

export async function updateStar(params) {
  return request(api + '/save/update', {
    method: 'POST',
    data: params,
  });
}