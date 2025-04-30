import { TestService } from '@/services/test.service';
import { useQuery } from '@tanstack/react-query';

interface IUseGetTestsList {
  status: 'expired' | 'published' | 'all';
  search?: string;
}

export function useGetTestsList({ status }: IUseGetTestsList) {
  return useQuery(TestService.getMyTestsQueryOptions(status));
}
