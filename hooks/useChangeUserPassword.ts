import { ChangePasswordForm } from '@/components/shared/change-forms/ChangeFormPassword';
import { UserService } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';

export function useChangeUserPassword() {
  const { mutate, isPending } = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (data: ChangePasswordForm) => UserService.changePassword(data),
  });

  return {
    handelChangePassword: mutate,
    isPending,
  };
}
