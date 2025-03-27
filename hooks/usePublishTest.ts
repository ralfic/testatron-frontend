import { errorCatch } from '@/api/api.helpers';
import { TestService } from '@/services/test.service';
import { ITest } from '@/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function usePublishTest() {
  const publishTestMutation = useMutation({
    mutationKey: ['publishTest'],
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Pick<ITest, 'expiresAt'>;
    }) => TestService.publishTest(id, data),
    onError: (error) => {
      toast.error(errorCatch(error));
    },
    onSuccess: () => {
      toast.success('Test published');
    },
  });

  return {
    handelPublishTest: publishTestMutation.mutate,
    isPending: publishTestMutation.isPending,
  };
}
