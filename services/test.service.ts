import { JoinTestFormData } from '@/components/shared/JoinTest';
import { axiosClassic, axiosWithAuth } from '@/services/instance';
import {
  IAnswer,
  IQuestionCreate,
  IQuestionUpdate,
  ITest,
  ITestPublish,
  ITestResult,
  ITestSession,
  ITestUpdateInfo,
} from '@/types';
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
  getMyTestsQueryOptions: (status: 'expired' | 'published' | 'all' = 'all') => {
    return queryOptions({
      queryKey: [TestService.baseKey, 'list', 'my'],
      queryFn: () => axiosWithAuth.get<ITest[]>(`/tests/my?status=${status}`),
      select: (data) => data.data,
    });
  },
  updateTestInfo: (id: number, data: ITestUpdateInfo) =>
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
  joinTest: (data: JoinTestFormData) =>
    axiosClassic.post(`/test/join/${data.code}`, {
      guestName: data.guestName,
    }),
  answerQuestion: (data: IAnswer) =>
    axiosClassic.put<ITestSession>(`/test/response/answer`, data),
  getTestSessionByUuidQueryOptions: (uuid: string) => {
    return queryOptions({
      queryKey: [TestService.baseKey, 'session', uuid],
      queryFn: () => axiosClassic.get<ITestSession>(`/test/session/${uuid}`),
      select: (data) => data.data,
    });
  },
  getTestSessionByUuid: (uuid: string) =>
    axiosClassic.get<ITestSession>(`/test/session/${uuid}`),
  sendResponseTest: (uuid: string) =>
    axiosClassic.put<ITestSession>(`/test/response/send/${uuid}`),
  getTestResultQueryOptions: (uuid: string) => {
    return queryOptions({
      queryKey: [TestService.baseKey, 'result', uuid],
      queryFn: () => axiosClassic.get<ITestResult>(`/test/response/${uuid}`),
      select: (data) => data.data,
    });
  },
};
