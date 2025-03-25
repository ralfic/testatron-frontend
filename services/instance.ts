import axios from 'axios';
import { errorCatch } from '@/api/api.helpers';
import { deleteConnectionSid } from './auth-session.service';
const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const axiosWithAuth = axios.create(options);
export const axiosClassic = axios.create(options);

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      errorCatch(error) === 'Unauthorized' &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      deleteConnectionSid();

      return axiosWithAuth.request(originalRequest);
    }

    return Promise.reject(error);
  }
);
