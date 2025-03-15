import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {
  LoginData,
  RegisterData,
} from '@/components/shared/auth/forms/schemas';
import { login, register, logout } from '@/services/auth.service';

export const useAuth = () => {
  const { replace } = useRouter();

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (data) => {
      toast.success(`Welcome ${data.data.fullName}`);
      replace('/i/dashboard');
    },
    onError: () => {
      toast.error('Invalid credentials');
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterData) => await register(data),
    onSuccess: (data) => {
      toast.success(`Welcome ${data.data.fullName}`);
      replace('/i/dashboard');
    },
    onError: () => {
      toast.error('Invalid credentials');
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => await logout(),
    onSuccess: () => {
      replace('/');
    },
  });

  return {
    loginUser: loginMutation.mutate,
    registerUser: registerMutation.mutate,
    logoutUser: logoutMutation.mutate,
  };
};
