'use client';
import { ITest } from '@/types';
import { Home } from 'lucide-react';
import parser from 'html-react-parser';
import { useRouter } from 'next/navigation';

interface Props {
  test: Omit<ITest, 'questions'>;
}

export function TestCard({ test }: Props) {
  const { push } = useRouter();
  return (
    <div
      className="bg-card p-4 rounded-[20px] relative pt-9 font-bold cursor-pointer "
      onClick={() => {
        push(`/test/edit/${test.id}`);
      }}
    >
      <span className="absolute bg-secondary  top-0  left-0 rounded-ss-[20px] rounded-ee-[20px] py-1.5 px-4 flex gap-2">
        <Home />
        Code: {test.code}
      </span>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          {parser(test.title)}
          <p className="text-gray-600 font-normal text-sm">
            Ends in: {'11/11/2023'}
          </p>
        </div>
      </div>
    </div>
  );
}
