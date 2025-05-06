'use client';

import { useGetTestStatisticById } from '@/hooks/teacher/useGetTestStatisticById';
import parser from 'html-react-parser';
import { IQuestion, ITestSessionStatistic } from '@/types';

import { TestStatisticSessionModal } from './session/TestStatisticSessionModal';
import { BarResultScore } from '../result/BarResultScore';
import { useState } from 'react';
import { useTestStatistic } from '@/hooks/test/statistic/useTestStatistic';
import { TestStatisticHeader } from './header/TestStatisticHeader';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  testId: number;
}
export function TestStatistic({ testId }: Props) {
  const { data, isLoading } = useGetTestStatisticById(testId);
  const {
    maxScore,
    averageScorePercentage,
    questionsCount,
    sessionsCount,
    createdAt,
    expiresAt,
  } = useTestStatistic(data);

  return (
    <div className="max-w-[750px]">
      {isLoading && <Skeleton className="h-24 w-full" />}
      {data && (
        <TestStatisticHeader
          test={data}
          averageScorePercentage={averageScorePercentage}
          createdAt={createdAt}
          expiresAt={expiresAt}
          sessionsCount={sessionsCount}
          questionsCount={questionsCount}
        />
      )}
      <div className="flex flex-col gap-2 mt-4">
        {isLoading &&
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full " />
          ))}
        {data?.testSessions?.map((session) => (
          <TestSessionCard
            key={session.id}
            session={session}
            maxScore={maxScore}
            questionsCount={questionsCount}
            questions={data.questions}
          />
        ))}
      </div>
    </div>
  );
}

function TestSessionCard({
  session,
  maxScore,
  questionsCount,
  questions,
}: {
  session: ITestSessionStatistic;
  maxScore: number;
  questionsCount: number;
  questions?: IQuestion[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const scorePercentage =
    maxScore > 0
      ? Math.round((session?.testResult?.score / maxScore) * 100)
      : 0;

  return (
    <div
      key={session.id}
      className="bg-card p-4 rounded grid grid-cols-3 gap-4 content-center items-center cursor-pointer hover:bg-card/80 transition-colors relative"
    >
      <div>
        <h2>{parser(session.guestName || '')}</h2>
        <TestStatisticSessionModal
          session={session}
          questionsCount={questionsCount}
          questions={questions}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div>
        <div className="bg-card rounded w-[300px] h-[35px] flex overflow-hidden">
          {questions && (
            <BarResultScore session={session} questionsCount={questionsCount} />
          )}
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <div className="text-gray-600 dark:text-gray-300 font-normal text-sm bg-purple-100 px-2 py-2 rounded flex justify-center items-center ">
          {session?.testResult?.score || 0} / {maxScore} points
        </div>
        <div className="text-gray-600 dark:text-gray-300 font-normal text-sm bg-purple-100 px-2 py-2 rounded flex justify-center items-center ">
          {scorePercentage || 0}%
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full"
        onClick={() => setIsOpen(true)}
      ></div>
    </div>
  );
}
