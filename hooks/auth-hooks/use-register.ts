import { RegisterData } from '@/components/shared/auth/forms/schemas';
import { register } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useRegister() {
  const { replace } = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterData) => await register(data),
    onSuccess: (data) => {
      toast.success(`Welcome ${data.data.fullName}`);
      replace('/dashboard');
    },
    onError: () => {
      toast.error('Invalid credentials');
    },
  });

  return { mutate, isPending };
}
