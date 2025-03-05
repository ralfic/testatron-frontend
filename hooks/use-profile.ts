import { getProfile } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => await getProfile(),
    select: (data) => data.data,
    retry: false,
  });

  return { profile: data, isLoading };
};
