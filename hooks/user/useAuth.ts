import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {
  LoginData,
  RegisterData,
} from '@/components/shared/auth/forms/schemas';

import { AuthService } from '@/services/auth.service';
import { UserRole } from '@/types';
import { queryClient } from '@/api/queryClient';
import { UserService } from '@/services/user.service';

export function useAuth() {
  const { replace, push } = useRouter();

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginData) => AuthService.login(data),
    onSuccess: (data) => {
      toast.success(`Welcome ${data.data.fullName}`);
      push(
        `/${
          data.data.role === UserRole.STUDENT ? 'student' : 'teacher'
        }/dashboard`
      );
    },

    onError: () => {
      toast.error('Failed to login');
    },
  });

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterData) => AuthService.register(data),
    onSuccess: (data) => {
      toast.success(`Welcome ${data.data.fullName}`);
      push(
        `/${
          data.data.role === UserRole.STUDENT ? 'student' : 'teacher'
        }/dashboard`
      );
    },
    onError: () => {
      toast.error('Failed to register');
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries(UserService.getProfileQueryOptions());
      replace('/');
    },
    onError: () => {
      toast.error('Failed to logout');
    },
  });

  return {
    loginUser: loginMutation.mutate,
    registerUser: registerMutation.mutate,
    logoutUser: logoutMutation.mutate,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
  };
}
