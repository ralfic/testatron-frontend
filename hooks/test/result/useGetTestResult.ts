import { TestService } from '@/services/test.service';
import { useQuery } from '@tanstack/react-query';

export function useGetTestResult(uuid: string) {
  return useQuery(TestService.getTestResultQueryOptions(uuid));
}
