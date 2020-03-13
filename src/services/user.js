import request, {api} from '@/utils/request';

export async function info() {
  const userId = localStorage.getItem('userId')
  return request(api + '/users/info', {
    method: 'GET',
    // data: { b: 2 },  post请求使用data传参数，get请求使用data传参数
    params: { userId },
  });
}
// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// export async function queryNotices() {
//   return request('/api/notices');
// }