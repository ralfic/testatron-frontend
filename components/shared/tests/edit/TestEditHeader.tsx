'use client';

import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { useEditTest } from '@/hooks/useEditTest';
import { prepareDataForBackend, useTestStore } from '@/store/useTestStore';
import { useEffect } from 'react';
import { TestEditHeaderTabs } from './TestEditHeaderTabs';

interface Props {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  testId: number;
}

export function TestEditHeader({ testId, setCurrentTab, currentTab }: Props) {
  const { updateTestMutation, isTestUpdating } = useEditTest(testId);
  const { test } = useTestStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (test) {
        updateTestMutation({
          id: testId,
          data: prepareDataForBackend(test),
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [test, updateTestMutation, testId]);

  return (
    <div className="bg-white fixed top-0 pt-2 left-0 right-0 z-10">
      <Container className="pt-4  flex flex-col gap-2 ">
        <div className="flex justify-between">
          <div className="flex gap-2 items-end">
            <h1 className="text-4xl font-semibold">Edit test</h1>
            {isTestUpdating && <p className="text-sm text-gray-600"></p>}
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
