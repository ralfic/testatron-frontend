import { TestService } from '@/services/test.service';
import { ITest } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

export function useDeleteTest() {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  const deleteTestMutation = useMutation<
    AxiosResponse<void>,
    Error,
    number,
    { previousTests?: AxiosResponse<ITest[], any> }
  >({
    mutationFn: (id: number) => TestService.deleteTest(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [TestService.baseKey, 'list', 'my'],
      });
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [TestService.baseKey, 'list', 'my'],
      });

      const previousTests = queryClient.getQueryData(
        TestService.getMyTestsQueryOptions().queryKey
      );

      if (previousTests) {
        queryClient.setQueryData([TestService.baseKey, 'list', 'my'], {
          ...previousTests,
          data: previousTests.data.filter((test) => test.id !== variables),
        });
      }

      return { previousTests };
    },
    onError: (error, id, context) => {
      if (context?.previousTests) {
        queryClient.setQueryData(
          [TestService.baseKey, 'list', 'my'],
          context.previousTests
        );
      }
    },
    onSuccess: () => {
      replace('/i/dashboard');
    },
  });

  return {
    handleDelete: () => deleteTestMutation.mutate,
    isPending: deleteTestMutation.isPending,
  };
}
