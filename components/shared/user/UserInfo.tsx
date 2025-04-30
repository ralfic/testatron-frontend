'use client';
import { AvatarFallback } from '@/components/ui/avatar';
import { useProfile } from '@/hooks/user/useProfile';
import { Avatar } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
  size?: 'sm' | 'md';
}

export default function UserInfo({ size = 'md' }: Props) {
  const { data: profile, isLoading } = useProfile();

  return (
    <div className="flex flex-col items-center gap-2">
      {isLoading && <UserInfoSkeleton size={size} />}
      {!isLoading && profile && (
        <>
          <Link href="/i/dashboard">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarFallback
                      className={cn('h-[86px] w-[86px] text-2xl', {
                        'h-11 w-11 text-lg': size === 'sm',
                      })}
                    >
                      {profile?.fullName.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p>{profile?.fullName}</p>
                    <p>{profile?.email}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
          {size === 'md' && (
            <div className="text-center">
              <h2 className="text-xl">{profile?.fullName}</h2>
              <p className="font-light ">{profile?.email}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function UserInfoSkeleton({ size = 'md' }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton
        className={cn('rounded-full', {
          'h-24 w-24': size === 'md',
          'h-12 w-12': size === 'sm',
        })}
      />
      {size === 'md' && (
        <div className=" flex flex-col gap-2 justify-center items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      )}
    </div>
  );
}
