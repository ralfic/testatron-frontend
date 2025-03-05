import { IUser } from '@/types';
import { axiosInstance } from './instance';

export const getProfile = () => {
  return axiosInstance.get<IUser>('/profile');
};
