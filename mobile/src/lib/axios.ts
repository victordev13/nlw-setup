import axios from 'axios';

// não usar localhost, mobile precisa do ip local
export const api = axios.create({
  baseURL: 'http://192.168.1.169:3333',
});
