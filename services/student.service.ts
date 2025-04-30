import { ITest, ITestSession } from '@/types';
import { axiosWithAuth } from './instance';
import { queryOptions } from '@tanstack/react-query';

export interface IPassedTest extends Omit<ITestSession, 'test'> {
  test: ITest;
}

export const StudentService = {
  baseKey: 'student',
  getPassedTestsQueryOptions: () => {
    return queryOptions({
      queryKey: [StudentService.baseKey, 'passed-tests'],
      queryFn: () => axiosWithAuth.get<IPassedTest[]>('/student/passed-tests'),
      select: (data) => data.data,
    });
  },
};
