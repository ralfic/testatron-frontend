import { axiosWithAuth } from '@/services/instance';
import { IQuestionCreate, IQuestionUpdate, ITest, ITestPublish } from '@/types';
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
  updateTestInfo: (id: number, data: Pick<ITest, 'title' | 'description'>) =>
    axiosWithAuth.patch(`/test/${id}`, data),
  publishTest: (id: number, data: ITestPublish) =>
    axiosWithAuth.patch(`/test/publish/${id}`, data),
  createTest: (data: Pick<ITest, 'title' | 'description'>) =>
    axiosWithAuth.post<ITest>('/test', data),
  deleteTest: (id: number) => axiosWithAuth.delete(`/test/${id}`),
  createQuestion: (id: number, data: IQuestionCreate) =>
    axiosWithAuth.post(`/test/${id}/question`, data),
  deleteQuestion: (testId: number, id: number) =>
    axiosWithAuth.delete(`/test/${testId}/question/${id}`),
  updateQuestion: (testId: number, id: number, data: IQuestionUpdate) =>
    axiosWithAuth.patch(`/test/${testId}/question/${id}`, data),
};
