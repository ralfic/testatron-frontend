'use client';
import Container from '@/components/shared/Container';
import { TestEditHeader } from './TestEditHeader';
import { TestEditQuestions } from './TestEditQuestions';
import { TestEditSettings } from './TestEditSettings';
import { useState } from 'react';

interface Props {
  testId: number;
}

export function TestEditLayout({ testId }: Props) {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <div>
      <TestEditHeader
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        testId={Number(testId)}
      />
      <Container>
        {currentTab === 1 && <TestEditQuestions testId={Number(testId)} />}
        {currentTab === 2 && <TestEditSettings />}
      </Container>
    </div>
  );
}
