import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {
  LoginData,
  RegisterData,
} from '@/components/shared/auth/forms/schemas';

import { ChangePasswordForm } from '@/components/shared/change-forms/ChangeFormPassword';
import { AuthService } from '@/services/auth.service';
import { errorCatch } from '@/api/api.helpers';

export const useAuth = () => {
  const { replace, push } = useRouter();

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginData) => AuthService.login(data),
    onSuccess: (data) => {
      toast.success(`Welcome ${data.data.fullName}`);
      push('/i/dashboard');
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
      push('/i/dashboard');
    },
    onError: () => {
      toast.error('Failed to register');
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      replace('/');
    },
    onError: () => {
      toast.error('Failed to logout');
    },
  });

  const changePasswordMutation = useMutation({
    mutationKey: ['change-password'],
    mutationFn: (data: ChangePasswordForm) => AuthService.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error) => {
      toast.error(errorCatch(error));
    },
  });

  return {
    loginUser: loginMutation.mutate,
    registerUser: registerMutation.mutate,
    logoutUser: logoutMutation.mutate,
    changePassword: changePasswordMutation.mutate,
  };
};
