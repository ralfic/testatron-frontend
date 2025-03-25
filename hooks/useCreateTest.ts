import { TestService } from '@/services/test.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useCreateTest = () => {
  const { replace } = useRouter();

  const createTestMutation = useMutation({
    mutationFn: () => TestService.createTest(),
    onSuccess: (data) => {
      replace(`/test/edit/${data.data.id}`);
    },
    onError: () => {
      toast.error('Failed to create test');
    },
  });

  return createTestMutation;
};
