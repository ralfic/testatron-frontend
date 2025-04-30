import { StudentService } from '@/services/student.service';
import { useQuery } from '@tanstack/react-query';

export function useGetPassedTests() {
  return useQuery(StudentService.getPassedTestsQueryOptions());
}
