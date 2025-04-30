import { queryClient } from '@/api/queryClient';
import { TestService } from '@/services/test.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useSendResponseTest() {
  const { replace } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ['sendResponseTest'],
    mutationFn: (uuid: string) => TestService.sendResponseTest(uuid),
    onSettled(_, __, uuid) {
      queryClient.invalidateQueries({
        queryKey: [TestService.baseKey, 'session', uuid],
      });
      queryClient.invalidateQueries(TestService.getMyTestsQueryOptions());
    },
    onSuccess(_, uuid) {
      replace(`/test/result/${uuid}`);
    },
  });
  return {
    handelSendResponseTest: mutate,
    isPending,
  };
}
