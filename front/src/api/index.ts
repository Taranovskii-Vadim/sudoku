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

export const api = async <D>(r: Route<D>, q?: string): Promise<D> => {
  const config: AxiosRequestConfig = { method: r.method, url: r.getUrl(q) };

  const { data } = await axiosInsatnce.request<D>(config);

  return r.getData(data);
};
