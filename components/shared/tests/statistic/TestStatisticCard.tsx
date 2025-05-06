'use client';

import parser from 'html-react-parser';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ITestStatistic, TestStatus } from '@/types';
import { useRouter } from 'next/navigation';

export function TestStatisticCard({ test }: { test: ITestStatistic }) {
  const averageScore =
    test?.testSessions?.reduce(
      (acc, session) => acc + session?.testResult?.score || 0,
      0
    ) || 0;
  const maxScore =
    test?.questions?.reduce((acc, question) => acc + question.score, 0) || 0;
  const averageScorePercentage = (averageScore / maxScore) * 100;
  const { push } = useRouter();

  return (
    <div
      className="bg-card p-4 rounded-[20px] font-bold flex justify-between gap-8"
      key={test.id}
      onClick={() => push(`/teacher/test/statistic/${test.id}`)}
    >
      <div className="flex flex-col gap-1">
        <div className=" text-lg">{parser(test.title)}</div>
        <span
          className={cn('px-2 py-1 rounded w-fit', {
            'bg-red-100': test.status === TestStatus.EXPIRED,
            'bg-green-100': test.status === TestStatus.PUBLISHED,
          })}
        >
          {test.status === TestStatus.EXPIRED ? 'Expired' : 'Ongoing'}
        </span>
        <div className={'flex gap-2'}>
          <div className="text-gray-600 dark:text-gray-300 font-normal text-sm">
            Started at: {format(new Date(test.createdAt), 'dd/MM/yyyy HH:mm')}
          </div>
          <div className="w-px h-full rounded-full bg-primary dark:bg-gray-300"></div>
          {test.expiresAt && (
            <div className="text-gray-600 dark:text-gray-300 font-normal text-sm">
              Ended at:{' '}
              {test.expiresAt &&
                format(new Date(test.expiresAt), 'dd/MM/yyyy HH:mm')}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2  justify-center items-center">
        <div className="text-gray-600 dark:text-gray-300 font-normal text-sm bg-purple-100 px-2 py-2 rounded text-center">
          {test.questions?.length} questions
        </div>
        <div className="text-gray-600 dark:text-gray-300 font-normal text-sm bg-purple-100 px-2 py-2 rounded text-center">
          {test.testSessions?.length} participant
        </div>
        <div className="text-gray-600 dark:text-gray-300 font-normal text-sm bg-purple-100 px-2 py-2 rounded text-center">
          {averageScorePercentage.toFixed(2)}% score
        </div>
      </div>
    </div>
  );
}
