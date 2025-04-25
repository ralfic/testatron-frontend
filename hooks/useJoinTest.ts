import { JoinTestFormData } from '@/components/shared/JoinTest';
import { TestService } from '@/services/test.service';
import { ITestSession } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useJoinTest() {
  const { push } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (
      data: JoinTestFormData
    ): Promise<AxiosResponse<ITestSession>> => TestService.joinTest(data),
    onSuccess(data) {
      push(`/test/testing/${data.data.uuid}`);
    },
    onError: () => {
      toast.error('Failed to join test');
    },
  });

  return {
    handelJoinTest: mutate,
    isPending,
  };
}
