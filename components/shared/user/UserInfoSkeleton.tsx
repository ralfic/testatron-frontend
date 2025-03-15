import { Skeleton } from '@/components/ui/skeleton';

export default function UserInfoSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className=" flex flex-col gap-2 justify-center items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}
