'use client';

import { SearchInput } from '@/components/shared/SearchInput';
import { TestEditModal } from '@/components/shared/tests/TestEditModal';
import { TestsList } from '@/components/shared/tests/TestList';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetTestsList } from '@/hooks/test/useGetTestsList';
import { useState } from 'react';

export default function DashboardPage() {
  const { data: tests, isLoading } = useGetTestsList({ status: 'all' });
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);

  return (
    <div className="tracking-wider px-10 flex gap-4">
      <div className="max-w-[600px] flex-grow">
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <SearchInput
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
        {tests && (
          <TestsList
            isLoading={isLoading}
            tests={tests}
            title="Latest tests"
            button={<TestEditModal action="create" />}
          />
        )}
      </div>
    </div>
  );
}
