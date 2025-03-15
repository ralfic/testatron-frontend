'use client';

import { useTestStore } from '@/store/useTestStore';
import { useEditTest } from '@/hooks/useEditTest';
import { Button } from '@/components/ui/button';
import { QuestionEditCard } from './QuestionEditCard';
import { SectionEditCard } from './SectionEditCard';
import { useState } from 'react';
import { TestCardSkeleton } from '../TestCardSkeleton';

export function TestEditQuestions({ testId }: { testId: number }) {
  const { isTestLoading } = useEditTest(testId);
  const { test, addQuestion } = useTestStore();
  const [focusElementId, setFocusElementId] = useState<string | number>('');

  return (
    <div className="flex flex-col gap-2 py-4 max-w-[800px] mx-auto pt-28">
      {isTestLoading && <TestCardSkeleton count={4} />}
      {!isTestLoading && test && (
        <>
          <SectionEditCard
            focusElementId={focusElementId}
            setFocus={() => setFocusElementId('header')}
            title={test.title}
            description={test.description}
          />

          {test?.questions?.map((question) => (
            <QuestionEditCard
              key={question.id}
              question={question}
              setFocus={() => setFocusElementId(question.id)}
              focusQuestionId={focusElementId}
            />
          ))}
        </>
      )}
      <Button
        size={'icon'}
        className="rounded-full mx-auto"
        onClick={() => addQuestion()}
      >
        +
      </Button>
    </div>
  );
}
