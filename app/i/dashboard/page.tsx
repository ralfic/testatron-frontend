'use client';

import { SearchInput } from '@/components/shared/SearchInput';
import { TestsList } from '@/components/shared/tests/TestList';
import { createTest, getMyTests } from '@/services/test.service';
import { useTestStore } from '@/store/useTestStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: tests, isLoading } = useQuery({
    queryKey: ['tests'],
    queryFn: () => getMyTests(),
    select: (data) => data.data,
  });

  const { setTest, test } = useTestStore();
  const createTestMutation = useMutation({
    mutationKey: ['createTest'],
    mutationFn: () => createTest(),
    onSuccess: (data) => setTest(data.data),
  });
  const { push } = useRouter();

  return (
    <div className="tracking-wider px-10 flex gap-4">
      <div className="max-w-[600px] flex-grow">
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <SearchInput />
        </div>
        {tests && (
          <TestsList
            isLoading={isLoading}
            tests={tests}
            title="Latest tests"
            actionText="Edit new test"
            action={() => {
              createTestMutation.mutate();
              push(`/test/${test?.id}/edit`);
            }}
          />
        )}
      </div>
    </div>
  );
}
