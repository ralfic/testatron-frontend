import { useMutation, useQuery } from '@tanstack/react-query';
import { createTest, getTest, updateTest } from '@/services/test.service';
import { ITestUpdate } from '@/types';
import { useTestStore } from '@/store/useTestStore';
import { useLayoutEffect } from 'react';

export const useEditTest = (testId: number) => {
  const { setTest } = useTestStore();

  const { data: testQuery, isLoading: isTestLoading } = useQuery({
    queryKey: ['test'],
    enabled: !!testId,
    queryFn: () => getTest(testId),
    select: (data) => data.data,
  });

  useLayoutEffect(() => {
    if (testQuery) {
      setTest(testQuery);
    }
  }, [testQuery, setTest]);

  const createTestMutation = useMutation({
    mutationKey: ['createTest'],
    mutationFn: () => createTest(),
    onSuccess: (data) => setTest(data.data),
  });

  const { mutate: updateTestMutation, isPending: isTestUpdating } = useMutation(
    {
      mutationKey: ['updateTest'],
      mutationFn: (variables: { id: number; data: Partial<ITestUpdate> }) =>
        updateTest(variables.id, variables.data),
      onSuccess: (data) => setTest(data.data),
    }
  );

  return {
    createTestMutation,
    updateTestMutation,
    isTestLoading,
    isTestUpdating,
  };
};
