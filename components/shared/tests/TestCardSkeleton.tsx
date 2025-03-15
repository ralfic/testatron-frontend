import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  count: number;
}

export function TestCardSkeleton({ count }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {[
        ...Array(count)
          .keys()
          .map((i) => (
            <Skeleton key={i} className="h-24 w-full bg-muted bg-white" />
          )),
      ]}
    </div>
  );
}
