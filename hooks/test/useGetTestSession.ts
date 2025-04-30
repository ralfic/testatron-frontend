import { TestService } from '@/services/test.service';
import { useQuery } from '@tanstack/react-query';

export function useGetTestSession(uuid: string) {
  return useQuery(TestService.getTestSessionByUuidQueryOptions(uuid));
}
