import { UserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  return useQuery(UserService.getProfileQueryOptions());
}
