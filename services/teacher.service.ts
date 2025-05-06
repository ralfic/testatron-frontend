import { ITestStatistic } from '@/types';
import { axiosWithAuth } from './instance';
import { queryOptions } from '@tanstack/react-query';

export const TeacherService = {
  baseKey: 'teacher',
  getTestStatisticQueryOptions: () => {
    return queryOptions({
      queryKey: [TeacherService.baseKey, 'test-statistic'],
      queryFn: () =>
        axiosWithAuth.get<ITestStatistic[]>('/teacher/test-statistic'),
      select: (data) => data.data,
    });
  },
  useGetTestStatisticByIdQueryOptions: (id: number) => {
    return queryOptions({
      queryKey: [TeacherService.baseKey, 'test-statistic', id],
      queryFn: () =>
        axiosWithAuth.get<ITestStatistic>(`/teacher/test-statistic/${id}`),
      select: (data) => data.data,
    });
  },
};
