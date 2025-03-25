import { IUser } from '@/types';
import { axiosWithAuth } from './instance';
import { queryOptions } from '@tanstack/react-query';

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
};
