'use client';

import { QuestionEditCard } from './question/QuestionEditCard';
import { SectionEditCard } from './SectionEditCard';
import { TestCardSkeleton } from '../TestCardSkeleton';
import { ITest } from '@/types';
import { QuestionEditModal } from './question/modal/QuestionEditModal';

export function TestEditQuestions({
  isTestLoading,
  test,
}: {
  isTestLoading: boolean;
  test?: ITest;
}) {
  const totalScore = test?.questions?.reduce(
    (acc, question) => acc + question.score,
    0
  );
  return (
    <>
      {test ? (
        <div className="flex flex-col gap-2 py-4 max-w-[800px] mx-auto pt-[100px]">
          {!isTestLoading && <SectionEditCard test={test} />}
          <h1 className="text-2xl font-semibold">
            {test?.questions?.length} questions (total score: {totalScore})
          </h1>

          {isTestLoading && <TestCardSkeleton count={4} />}
          {!isTestLoading && (
            <>
              {test?.questions?.map((question) => (
                <QuestionEditCard
                  key={question.id}
                  question={question}
                  totalScore={totalScore}
                />
              ))}
            </>
          )}
          {!isTestLoading && (
            <QuestionEditModal testId={test.id} action="create" />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 py-4 max-w-[800px] mx-auto pt-[100px]">
          <TestCardSkeleton count={4} />
        </div>
      )}
    </>
  );
}
