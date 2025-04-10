import { TestService } from '@/services/test.service';
import { useQuery } from '@tanstack/react-query';

export function useGetTestById(id: number) {
  return useQuery(TestService.getTestByIdQueryOptions(id));
}
