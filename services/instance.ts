import axios from 'axios';
import { getCookieServer } from './getCookiesServer';
const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const axiosInstance = axios.create(options);

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const cookiesStore = await getCookieServer();

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      cookiesStore.delete('connect.sid');

      return axiosInstance.request(originalRequest);
    }

    return Promise.reject(error);
  }
);
