'use client';

import { Container } from '@/components/shared/Container';
import { prepareDataForBackend, useTestStore } from '@/store/useTestStore';
import { useEffect } from 'react';
import { useUpdateTest } from '@/hooks/useUpdateTest';
import { TestPublishModal } from '../publish/TestPublishModal';
import { TestEditHeaderTabs } from './TestEditHeaderTabs';

interface Props {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
}

export function TestEditHeader({ setCurrentTab, currentTab }: Props) {
  const { test } = useTestStore();
  const { handelUpdateTest, isPending } = useUpdateTest();

  useEffect(() => {
    if (!test) return;
    const interval = setInterval(() => {
      handelUpdateTest({
        id: test.id,
        data: prepareDataForBackend(test),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [handelUpdateTest, test]);

  return (
    <div className="bg-white fixed top-0 pt-2 left-0 right-0 z-10">
      <Container className="pt-4  flex flex-col gap-2 ">
        <div className="flex justify-between">
          <div className="flex gap-2 items-end">
            <h1 className="text-4xl font-semibold">Edit test</h1>
            {isPending && <p className="text-sm text-gray-600"></p>}
          </div>
          <TestPublishModal />
        </div>
        <div className="grid grid-cols-3 w-full max-w-[800px] mx-auto">
          <TestEditHeaderTabs
            className="col-start-2 col-end-2"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <p className="ml-auto">
            <span>Total points: </span>
            {test?.questions?.reduce(
              (acc, question) => question.score + acc,
              0
            )}
          </p>
        </div>
      </Container>
    </div>
  );
}
