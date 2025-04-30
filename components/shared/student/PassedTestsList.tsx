'use client';
import parser from 'html-react-parser';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { IoMdArrowRoundForward as ArrowRight } from 'react-icons/io';
import { useGetPassedTests } from '@/hooks/student/test/useGetPassedTests';
import { IPassedTest } from '@/services/student.service';

export function PassedTestsList() {
  const { data, isLoading } = useGetPassedTests();

  return (
    <div>
      <h1 className="text-4xl font-semibold">Passed tests</h1>
      {isLoading && <p>Loading...</p>}
      {!data && !isLoading && <p>No tests</p>}
      {data && (
        <div className="flex flex-col gap-4 mt-4">
          {!data.length && <p>No tests</p>}
          {data.map((session) => (
            <PassedTestCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}

export function PassedTestCard({ session }: { session: IPassedTest }) {
  return (
    <div className="bg-card p-4 rounded-[20px] font-bold flex justify-between gap-4 max-w-[600px]">
      <div className="flex flex-col ">
        <div className=" text-lg">{parser(session.test.title)}</div>

        <div className={'flex gap-2'}>
          <div className="text-gray-600 dark:text-gray-300 font-normal text-sm">
            Started at:{' '}
            {format(new Date(session.createdAt), 'dd/MM/yyyy HH:mm')}
          </div>
          <div className="w-px h-full rounded-full bg-primary dark:bg-gray-300"></div>
          {session.endedAt && (
            <div className="text-gray-600 dark:text-gray-300 font-normal text-sm">
              Ended at:{' '}
              {session.endedAt &&
                format(new Date(session.endedAt), 'dd/MM/yyyy HH:mm')}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 flex-col justify-center items-center">
        <Link href={`/test/result/${session.uuid}`}>
          <Button size={'icon'}>
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
