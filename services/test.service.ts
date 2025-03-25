import { axiosWithAuth } from '@/services/instance';
import { ITest, ITestUpdate } from '@/types';
import { queryOptions } from '@tanstack/react-query';

export const TestService = {
  baseKey: 'test',
  getTestByIdQueryOptions: (id: number) => {
    return queryOptions({
      queryKey: [TestService.baseKey, id, 'byId'],
      queryFn: () => axiosWithAuth.get<ITest>(`/test/${id}`),
      select: (data) => data.data,
    });
  },
  getMyTestsQueryOptions: () => {
    return queryOptions({
      queryKey: [TestService.baseKey, 'list', 'my'],
      queryFn: () => axiosWithAuth.get<ITest[]>('/tests/my'),
      select: (data) => data.data,
    });
  },
  createTest: () => axiosWithAuth.post<ITest>('/test'),
  updateTest: (id: number, data: Partial<ITestUpdate>) =>
    axiosWithAuth.put<ITest>(`/test/${id}`, data),
  deleteTest: (id: number) => axiosWithAuth.delete(`/test/${id}`),
};
