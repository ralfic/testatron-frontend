import { TestService } from '@/services/test.service';
import { ITestUpdate } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useUpdateTest = () => {
  const updateTestMutation = useMutation({
    mutationKey: ['updateTest'],
    mutationFn: ({ id, data }: { id: number; data: Partial<ITestUpdate> }) =>
      TestService.updateTest(id, data),
  });

  return {
    handelUpdateTest: updateTestMutation.mutate,
    isPending: updateTestMutation.isPending,
  };
};
