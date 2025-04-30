import { IUser } from '@/types';
import { axiosWithAuth } from './instance';
import { queryOptions } from '@tanstack/react-query';
import { ChangePasswordForm } from '@/components/shared/change-forms/ChangeFormPassword';

export const UserService = {
  baseKey: 'user',
  getProfileQueryOptions: () =>
    queryOptions({
      queryKey: [UserService.baseKey],
      queryFn: () => axiosWithAuth.get<IUser>('/profile'),
      select: (data) => data.data,
      retry: false,
    }),
  changeProfile: (data: Pick<IUser, 'fullName'>) =>
    axiosWithAuth.put('/profile', data),
  changePassword: (data: ChangePasswordForm) => {
    return axiosWithAuth.put('/auth/change-password', data);
  },
  getProfile: (session: string) => {
    return axiosWithAuth.get<IUser>('/profile', {
      headers: {
        Cookie: `connect.sid=${session}`,
      },
    });
  },
};
