import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { IQuestionUpdate } from '@/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useUpdateQuestion() {
  const updateQuestionMutation = useMutation({
    mutationKey: ['updateQuestion'],
    mutationFn: ({
      id,
      data,
      testId,
    }: {
      testId: number;
      id: number;
      data: IQuestionUpdate;
    }) => TestService.updateQuestion(testId, id, data),
    onSuccess(_, variables) {
      toast.success('Question updated');
      queryClient.invalidateQueries(
        TestService.getTestByIdQueryOptions(variables.testId)
      );
    },
  });

  return {
    handelUpdateQuestion: updateQuestionMutation.mutate,
    isPending: updateQuestionMutation.isPending,
  };
}
