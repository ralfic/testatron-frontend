'use client';

import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { prepareDataForBackend, useTestStore } from '@/store/useTestStore';
import { useEffect } from 'react';
import { TestEditHeaderTabs } from './TestEditHeaderTabs';
import { useUpdateTest } from '@/hooks/useUpdateTest';

interface Props {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
}

export function TestEditHeader({ setCurrentTab, currentTab }: Props) {
  const { test } = useTestStore();
  const { handelUpdateTest, isPending } = useUpdateTest();

  useEffect(() => {
    const interval = setInterval(() => {
      if (test) {
        handelUpdateTest({
          id: test.id,
          data: prepareDataForBackend(test),
        });
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [handelUpdateTest]);

  return (
    <div className="bg-white fixed top-0 pt-2 left-0 right-0 z-10">
      <Container className="pt-4  flex flex-col gap-2 ">
        <div className="flex justify-between">
          <div className="flex gap-2 items-end">
            <h1 className="text-4xl font-semibold">Edit test</h1>
            {isPending && <p className="text-sm text-gray-600"></p>}
          </div>
          <Button>Publish</Button>
        </div>
        <TestEditHeaderTabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Container>
    </div>
  );
}
