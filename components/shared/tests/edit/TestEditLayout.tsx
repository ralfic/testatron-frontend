'use client';
import { Container } from '@/components/shared/Container';
import { TestEditHeader } from './header/TestEditHeader';
import { TestEditQuestions } from './TestEditQuestions';
import { TestEditSettings } from './settings/TestEditSettings';
import { useEffect, useState } from 'react';
import { useEditTest } from '@/hooks/useEditTest';
import { useTestStore } from '@/store/useTestStore';

interface Props {
  testId: number;
}

export function TestEditLayout({ testId }: Props) {
  const [currentTab, setCurrentTab] = useState(1);
  const { isLoading } = useEditTest(testId);
  const clearStore = useTestStore((state) => state.clearStore);

  useEffect(() => {
    return () => {
      clearStore();
    };
  }, []);

  return (
    <div>
      <TestEditHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Container>
        {currentTab === 1 && <TestEditQuestions isTestLoading={isLoading} />}
        {currentTab === 2 && <TestEditSettings />}
      </Container>
    </div>
  );
}
