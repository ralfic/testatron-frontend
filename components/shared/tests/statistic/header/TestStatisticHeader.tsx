'use client';
import parser from 'html-react-parser';
import { Button } from '@/components/ui/button';
import { ITestStatistic, TestStatus } from '@/types';
import { useRouter } from 'next/navigation';
import { AiFillEdit } from 'react-icons/ai';

interface Props {
  test: ITestStatistic;
  averageScorePercentage: string;
  createdAt: string;
  expiresAt: string;
  sessionsCount: number;
  questionsCount: number;
}

export function TestStatisticHeader({
  test,
  averageScorePercentage,
  createdAt,
  expiresAt,
  sessionsCount,
  questionsCount,
}: Props) {
  const router = useRouter();
  return (
    <div className="bg-card p-4 rounded flex gap-4  justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl">{parser(test.title || '')}</h1>
          <Button
            size={'icon'}
            variant={'outline'}
            className="flex gap-2 items-center"
            onClick={() => router.push(`/test/edit/${test.id}`)}
          >
            <AiFillEdit />
          </Button>
        </div>
        <div>
          {test.status === TestStatus.PUBLISHED && (
            <div className=" font-normal text-sm">Created at: {createdAt}</div>
          )}
          {test.status === TestStatus.EXPIRED && test?.expiresAt && (
            <div className=" font-normal text-sm">Expired at: {expiresAt}</div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="text-gray-600 dark:text-gray-300 font-normal text-sm bg-purple-100 px-2 py-2 rounded flex flex-col justify-center items-center ">
          {averageScorePercentage}%<p>average score</p>
        </div>
        <div className="text-gray-600 dark:text-gray-300 font-normal text-sm bg-purple-100 px-2 py-2 rounded flex flex-col justify-center items-center">
          {sessionsCount} <p>participant</p>
        </div>
        <div className="text-gray-600 dark:text-gray-300 font-normal text-sm bg-purple-100 px-2 py-2 rounded flex flex-col justify-center items-center">
          {questionsCount} <p>questions</p>
        </div>
      </div>
    </div>
  );
}
