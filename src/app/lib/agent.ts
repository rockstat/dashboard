
import Axios from 'axios';
import { BandServicesList, ApiWrapper, BandImagesList, Stub, GenricCallee } from 'app/types'

// import commonStore from './stores/commonStore';
// import userStore from './stores/userStore';
// import authStore from './stores/authStore';


const headers = {}
if (API_AUTH) {
  const basicAuth = 'Basic ' + btoa(API_AUTH.username + ':' + API_AUTH.password);
  headers['Authorization'] = basicAuth
}

const loc = document.location;
export const host = document.location.hostname;
export const protocol = document.location.protocol;
export const baseDomain = host.indexOf('app.') === 0 ? host.substr(4) : host;
export const baseURL = API_URL_TMPL.replace('<host>', document.location.hostname)
export const wsURL = `${(loc.protocol === 'https:' ? 'wss' : 'ws')}://${loc.hostname}/ws`;

const client = Axios.create({
  baseURL: baseURL,
  timeout: 3000,
  headers
});

const encode = encodeURIComponent;

const responseData = res => res.data;

export const requests: ApiWrapper = {
  del: url =>
    client
      .delete(`${url}`)
      .then(responseData),
  get: url =>
    client
      .get(`${url}`)
      .then(responseData),
  put: (url, body) =>
    client
      .put(`${url}`, body)
      .then(responseData),
  patch: (url, body) =>
    client
      .patch(`${url}`, body)
      .then(responseData),
  post: (url, body) =>
    client
      .post(`${url}`, body)
      .then(responseData),
};
