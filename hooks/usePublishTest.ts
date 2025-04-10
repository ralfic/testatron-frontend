import { errorCatch } from '@/api/api.helpers';
import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { ITestPublish } from '@/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function usePublishTest() {
  const publishTestMutation = useMutation({
    mutationKey: ['publishTest'],
    mutationFn: ({ id, data }: { id: number; data: ITestPublish }) =>
      TestService.publishTest(id, data),
    onError: (error) => {
      toast.error(errorCatch(error));
    },
    onSuccess: () => {
      toast.success('Test published');
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries(
        TestService.getTestByIdQueryOptions(variables.id)
      );
      queryClient.invalidateQueries(TestService.getMyTestsQueryOptions());
    },
  });

  return {
    handelPublishTest: publishTestMutation.mutate,
    isPending: publishTestMutation.isPending,
  };
}
