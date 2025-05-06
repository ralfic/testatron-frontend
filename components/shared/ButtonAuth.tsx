'use client';

import { useProfile } from '@/hooks/user/useProfile';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types';

interface Props {
  onClose: () => void;
}

export function ButtonAuth({ onClose }: Props) {
  const { data: profile, isLoading } = useProfile();
  const router = useRouter();

  return (
    <Button
      className="ml-auto"
      onClick={() => {
        if (profile) {
          router.push(
            `/${
              profile.role === UserRole.STUDENT
                ? 'student/dashboard'
                : 'teacher/test/my'
            }`
          );
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
