'use client';
import { ITest } from '@/types';
import { Home } from 'lucide-react';
import parser from 'html-react-parser';
import Link from 'next/link';
import { format } from 'date-fns';

interface Props {
  test: Omit<ITest, 'questions'>;
}

export function TestCard({ test }: Props) {
  return (
    <Link
      href={`/test/edit/${test.id}`}
      className="bg-card p-4 rounded-[20px] relative pt-9 font-bold cursor-pointer "
      prefetch
    >
      {test.code && (
        <span className="absolute bg-secondary  top-0  left-0 rounded-ss-[20px] rounded-ee-[20px] py-1.5 px-4 flex gap-2">
          <Home />
          Code: {test.code}
        </span>
      )}
      {!test.code && (
        <span className="absolute bg-accent  top-0  left-0 rounded-ss-[20px] rounded-ee-[20px] py-1.5 px-4 flex gap-2">
          <Home />
          Public
        </span>
      )}
      <div className="flex justify-between">
        <div className="flex flex-col ">
          {parser(test.title)}
          {test.expiresAt && (
            <p className="text-gray-600 font-normal text-sm">
              Ends in: {format(new Date(test.expiresAt), 'dd/MM/yyyy HH:mm')}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
