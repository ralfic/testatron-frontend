'use client';
import { AvatarFallback } from '@/components/ui/avatar';
import { useProfile } from '@/hooks/useProfile';
import { Avatar } from '@radix-ui/react-avatar';
import UserInfoSkeleton from './UserInfoSkeleton';

export default function UserInfo() {
  const { profile, isLoading } = useProfile();

  return (
    <div className="flex flex-col items-center gap-2">
      {isLoading && <UserInfoSkeleton />}
      {!isLoading && profile && (
        <>
          <Avatar>
            <AvatarFallback className="h-24 w-24 text-2xl">
              {profile?.fullName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="text-white text-center">
            <h2 className="text-xl">{profile?.fullName}</h2>
            <p className="font-light ">{profile?.email}</p>
          </div>
        </>
      )}
    </div>
  );
}
