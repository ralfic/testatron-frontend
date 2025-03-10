'use client';

import { useProfile } from '@/hooks/use-profile';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  onClose: () => void;
}

export function ButtonAuth({ onClose }: Props) {
  const { profile, isLoading } = useProfile();
  const router = useRouter();

  return (
    <Button
      className="ml-auto"
      onClick={() => {
        if (profile) {
          router.push('/i/dashboard');
        } else {
          onClose();
        }
      }}
      loading={isLoading}
    >
      {profile ? 'Profile' : 'Login'}
    </Button>
  );
}
