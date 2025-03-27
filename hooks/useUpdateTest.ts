import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { ITestUpdate } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useUpdateTest() {
  const updateTestMutation = useMutation({
    mutationKey: ['updateTest'],
    mutationFn: ({ id, data }: { id: number; data: Partial<ITestUpdate> }) =>
      TestService.updateTest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(TestService.getMyTestsQueryOptions());
    },
  });

  return {
    handelUpdateTest: updateTestMutation.mutate,
    isPending: updateTestMutation.isPending,
  };
}
