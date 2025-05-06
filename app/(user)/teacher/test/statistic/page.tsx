'use client';

import { useGetTestStatistic } from '@/hooks/teacher/useGetTestStatistic';
import { Skeleton } from '@/components/ui/skeleton';
import { TestStatisticCard } from '@/components/shared/tests/statistic/TestStatisticCard';

export default function TestStatisticPage() {
  const { data: tests, isLoading } = useGetTestStatistic();

  return (
    <div className="tracking-wider px-10 flex gap-4">
      <div className="flex-grow">
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="text-4xl font-semibold">Test statistic</h1>
        </div>
        <div className="flex flex-col gap-4 max-w-[850px]">
          {isLoading && <Skeleton className="h-28 w-full" />}
          {tests &&
            tests.map((test) => (
              <TestStatisticCard key={test.id} test={test} />
            ))}
        </div>
      </div>
    </div>
  );
}
