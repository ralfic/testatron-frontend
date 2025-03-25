import { IUser } from '@/types';
import { axiosClassic, axiosWithAuth } from './instance';
import {
  LoginData,
  RegisterData,
} from '@/components/shared/auth/forms/schemas';
import { ChangePasswordForm } from '@/components/shared/change-forms/ChangeFormPassword';

export const AuthService = {
  login: (data: LoginData) => {
    return axiosClassic.post<IUser>('/auth/login', data);
  },
  register: (data: RegisterData) => {
    return axiosClassic.post<IUser>('/auth/register', data);
  },
  logout: () => {
    return axiosWithAuth.post('/auth/logout');
  },
  changePassword: (data: ChangePasswordForm) => {
    return axiosWithAuth.put('/auth/change-password', data);
  },
};
