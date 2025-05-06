import { TeacherService } from '@/services/teacher.service';
import { useQuery } from '@tanstack/react-query';

export function useGetTestStatisticById(id: number) {
  return useQuery(TeacherService.useGetTestStatisticByIdQueryOptions(id));
}
