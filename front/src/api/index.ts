import axios, { AxiosRequestConfig } from 'axios';

import { Route } from './types';

const baseURL = '/api';

const axiosInsatnce = axios.create({ baseURL });

// axiosInsatnce.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;

//     if (response.data.statusCode === 401) {
//       auth.logout();
//     }

//     return Promise.reject(error);
//   },
// );

export const api = async <D>(r: Route<D>, q?: GameMode, p?: Record<string, unknown>): Promise<D> => {
  let config: AxiosRequestConfig = { method: r.method, url: r.getUrl(q) };

  if (p) {
    config = { ...config, data: p };
  }

  const { data } = await axiosInsatnce.request<D>(config);

  return r.getData(data);
};
