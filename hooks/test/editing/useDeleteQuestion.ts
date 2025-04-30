import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { useMutation } from '@tanstack/react-query';

export function useDeleteQuestion() {
  const deleteQuestionMutation = useMutation({
    mutationFn: ({ id, testId }: { id: number; testId: number }) =>
      TestService.deleteQuestion(testId, id),
    onSettled(_, __, variables) {
      queryClient.invalidateQueries(
        TestService.getTestByIdQueryOptions(variables.testId)
      );
    },
  });

  return {
    handelDeleteQuestion: deleteQuestionMutation.mutate,
    isPending: deleteQuestionMutation.isPending,
  };
}
