
import Axios from 'axios';
import { BandServicesList, ApiWrapper, BandImagesList, Stub, GenricCallee } from '../types'

// import commonStore from './stores/commonStore';
// import userStore from './stores/userStore';
// import authStore from './stores/authStore';


const client = Axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

const API_ROOT = API_URL_TMPL.replace('<host>', document.location.host);
console.log(API_ROOT)

const encode = encodeURIComponent;

const responseBody = res => res.body;

export const requests: ApiWrapper = {
  del: url =>
    client
      .delete(`${API_ROOT}${url}`)
      .then(responseBody),
  get: url =>
    client
      .get(`${API_ROOT}${url}`)
      .then(responseBody),
  put: (url, body) =>
    client
      .put(`${API_ROOT}${url}`, body)
      .then(responseBody),
  patch: (url, body) =>
    client
      .patch(`${API_ROOT}${url}`, body)
      .then(responseBody),
  post: (url, body) =>
    client
      .post(`${API_ROOT}${url}`, body)
      .then(responseBody),
};
