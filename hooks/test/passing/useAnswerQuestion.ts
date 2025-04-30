import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { IAnswer } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useAnswerQuestion(uuid: string) {
  const answerQuestionMutation = useMutation({
    mutationKey: ['answerQuestion'],
    mutationFn: (data: IAnswer) => TestService.answerQuestion(data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TestService.baseKey, 'session', uuid],
      });
    },
  });

  return {
    handelAnswerQuestion: answerQuestionMutation.mutate,
    isPending: answerQuestionMutation.isPending,
  };
}
