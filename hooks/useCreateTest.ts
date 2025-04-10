import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { ITest } from '@/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useCreateTest() {
  const createTestMutation = useMutation({
    mutationFn: (data: Pick<ITest, 'title' | 'description'>) =>
      TestService.createTest(data),
    onSuccess: () => {
      toast.success('Test created');
      queryClient.invalidateQueries(TestService.getMyTestsQueryOptions());
    },
    onError: () => {
      toast.error('Failed to create test');
    },
  });

  return {
    handelCreateTest: createTestMutation.mutate,
    isPending: createTestMutation.isPending,
  };
}
