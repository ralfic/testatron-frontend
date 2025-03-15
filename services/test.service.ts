import { ITest, ITestUpdate } from '@/types';
import { axiosInstance } from './instance';

export const getTest = (id: number) => {
  return axiosInstance.get<ITest>(`/test/${id}`);
};

export const createTest = () => {
  return axiosInstance.post<ITest>('/test');
};

export const updateTest = (id: number, data: Partial<ITestUpdate>) => {
  return axiosInstance.put<ITest>(`/test/${id}`, data);
};

export const deleteTest = (id: number) => {
  return axiosInstance.delete(`/test/${id}`);
};

export const getMyTests = () => {
  return axiosInstance.get<ITest[]>('/tests/my');
};
