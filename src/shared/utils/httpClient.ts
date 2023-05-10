import axios, { RawAxiosRequestHeaders } from 'axios';
import { API_URL } from '@/constants/common';

const httpClient = axios.create({
  baseURL: API_URL,
});

httpClient.interceptors.request.use(
  async ({ headers, ...config }): Promise<any> => {
    const token =
      sessionStorage.getItem('token') || localStorage.getItem('token');

    const updatedHeader: RawAxiosRequestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-control': 'no-store',
      ...(headers || {}),
    };

    if (token) {
      updatedHeader['Authorization'] = `Bearer ${token}`;
    }

    const newConfig = {
      ...config,
      headers: updatedHeader,
    };

    return newConfig;
  },
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);

export default httpClient;
