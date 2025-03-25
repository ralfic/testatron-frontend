'use client';

import { SearchInput } from '@/components/shared/SearchInput';
import { TestsList } from '@/components/shared/tests/TestList';
import { Button } from '@/components/ui/button';
import { useCreateTest } from '@/hooks/useCreateTest';
import { TestService } from '@/services/test.service';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const { data: tests, isLoading } = useQuery(
    TestService.getMyTestsQueryOptions()
  );
  const createTestMutation = useCreateTest();

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
            button={
              <Button
                onClick={() => createTestMutation.mutate()}
                disabled={createTestMutation.isPending}
              >
                Create test
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
