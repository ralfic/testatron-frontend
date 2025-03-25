import { useQuery } from '@tanstack/react-query';
import { useTestStore } from '@/store/useTestStore';
import { useEffect } from 'react';
import { TestService } from '@/services/test.service';

export const useEditTest = (testId: number) => {
  const { setTest } = useTestStore();

  const test = useQuery({
    ...TestService.getTestByIdQueryOptions(testId),

    select: (data) => {
      return data.data;
    },
  });

  useEffect(() => {
    if (test.data) {
      setTest(test.data);
    }
  }, [test.data, setTest]);

  return test;
};
