import { ITest } from '@/types';
import { ArrowBigRight, Home } from 'lucide-react';
import parser from 'html-react-parser';
import Link from 'next/link';

interface Props {
  test: Omit<ITest, 'questions'>;
}

export function TestCard({ test }: Props) {
  return (
    <div className="bg-lightCream p-4 rounded-[20px] relative pt-9 font-bold">
      <span className="absolute top-0 bg-cream left-0 rounded-ss-[20px] rounded-ee-[20px] py-1.5 px-4 flex gap-2">
        <Home />
        Code: {test.code}
      </span>
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p>{parser(test.title)}</p>
          <p className="text-gray-600 font-normal text-sm">
            Ends in: {'11/11/2023'}
          </p>
        </div>
        <div>
          <Link href={`/test/${test.id}/edit`}>
            <ArrowBigRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
