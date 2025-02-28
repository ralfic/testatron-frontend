import { IUser } from '@/types';
import { axiosInstance } from './instance';
import {
  LoginData,
  RegisterData,
} from '@/components/shared/auth/forms/schemas';

export const login = (data: LoginData) => {
  return axiosInstance.post<IUser>('/auth', data);
};

export const register = (data: RegisterData) => {
  return axiosInstance.post<IUser>('/auth/register', data);
};

export const logout = () => {
  return axiosInstance.post('/auth/logout');
};
