import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { IQuestionCreate } from '@/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCreateQuestion = () => {
  const createQuestionMutation = useMutation({
    mutationKey: ['createQuestion'],
    mutationFn: ({ id, data }: { id: number; data: IQuestionCreate }) =>
      TestService.createQuestion(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(
        TestService.getTestByIdQueryOptions(variables.id)
      );
      toast.success('Question created');
    },
  });

  return {
    handelCreateQuestion: createQuestionMutation.mutate,
    isPending: createQuestionMutation.isPending,
  };
};
