import { LoginData } from '@/components/shared/auth/forms/schemas';
import { login } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const { replace } = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginData) => await login(data),
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
