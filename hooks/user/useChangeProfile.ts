import { UserService } from '@/services/user.service';
import { IUser } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useChangeProfile() {
  const queryClient = useQueryClient();

  const changeProfileMutation = useMutation({
    mutationFn: (data: Pick<IUser, 'fullName'>) =>
      UserService.changeProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries(UserService.getProfileQueryOptions());
    },
  });

  return {
    handelChangeProfile: changeProfileMutation.mutate,
    isPending: changeProfileMutation.isPending,
  };
}
