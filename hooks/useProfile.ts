import { UserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery(UserService.getProfileQueryOptions());
};
