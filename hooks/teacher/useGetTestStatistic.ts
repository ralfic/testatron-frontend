import { TeacherService } from '@/services/teacher.service';
import { useQuery } from '@tanstack/react-query';

export function useGetTestStatistic() {
  return useQuery(TeacherService.getTestStatisticQueryOptions());
}
