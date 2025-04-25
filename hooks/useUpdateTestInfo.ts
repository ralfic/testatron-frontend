import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { ITestUpdateInfo } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useUpdateTestInfo() {
  const updateTestMutation = useMutation({
    mutationKey: ['updateTest'],
    mutationFn: ({ id, data }: { id: number; data: ITestUpdateInfo }) =>
      TestService.updateTestInfo(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        TestService.getTestByIdQueryOptions(variables.id)
      );
      queryClient.invalidateQueries(TestService.getMyTestsQueryOptions());
    },
  });

  return {
    handelUpdateTest: updateTestMutation.mutate,
    isPending: updateTestMutation.isPending,
  };
}
