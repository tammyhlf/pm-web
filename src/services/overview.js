import request, {api} from '@/utils/request';

export async function overview(params) {
  return request(api + '/overview', {
    method: 'GET',
    params: params,
  });
}