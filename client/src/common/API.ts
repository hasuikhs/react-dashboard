/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosInstance } from 'axios';
import Swal from 'sweetalert2';

const BASE_URL: string = 'http://localhost:3030';
const expireSessionCode: number[] = [401, 419]; // 401: invalid token, 419: expire token

const expireSessionAlert = (callback: Function) => {
  return Swal.fire({
    title: '로그인 세션이 만료되었습니다.',
    icon: 'error',
    confirmButtonText: '확인',
    didClose: () => callback()
  })
}

const etcErrorAlert = () => {
  return Swal.fire({
    title: '서버 에러입니다. 잠시 후 다시 시도해주세요.',
    icon: 'error',
    confirmButtonText: '확인',
  })
}

const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 3000
});

const requestAPI = async ({type, url, body, callback}: { type: string, url: string, body?: any, callback: Function}): Promise<any> => {
  type = type.toUpperCase();

  API.defaults.headers.common['Authorization'] = sessionStorage.getItem('token') as string;

  try {
    let ret = null;

    switch (type) {
      case 'GET':
        ret = await API.get(url);
        break;
      case 'POST':
        ret = await API.post(url, body);
        break;
      case 'PUT':
        ret = await API.put(url, body);
        break;
      case 'DELETE':
        ret = await API.delete(url);
        break;
      default:
        break;
    }
    
    return ret?.data;
  } catch (error: any) {
    if (expireSessionCode.includes(error?.response.data.code)) {
      return expireSessionAlert(callback);
    } else {
      return etcErrorAlert();
    }
  }
}

const getAPI = async (url: string, callback: Function): Promise<any> => {
  try {
    let ret = await API.get(url);

    return ret.data;
  } catch(err: any) {
    if (expireSessionCode.includes(err?.response.data.code)) {
      return expireSessionAlert(callback);
    } else {
      return etcErrorAlert();
    }
  }
}

const postAPI = async  (url: string, body: any, callback: Function): Promise<any> => {
  try {
    let ret = await API.post(url, body);

    return ret.data;
  } catch (err: any) {
    if (expireSessionCode.includes(err?.response.data.code)) {
      return expireSessionAlert(callback);
    } else {
      return etcErrorAlert();
    }
  }
}

export default API;
export { getAPI, postAPI, requestAPI };