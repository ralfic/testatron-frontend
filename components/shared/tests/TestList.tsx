'use client';

import { ITest } from '@/types';
import { Button } from '../../ui/button';
import { TestCard } from './TestCard';

interface Props {
  tests: Omit<ITest, 'questions'>[] | undefined;
  title: 'Latest tests' | 'Ended tests' | 'Ongoing tests';
  actionText: 'Edit new test' | 'Delete all tests';
  isLoading: boolean;
  action: () => void;
}

export function TestsList({
  tests,
  title,
  action,
  actionText,
  isLoading,
}: Props) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-3xl">{title}</h3>
        <Button className="bg-cream" onClick={() => action()}>
          {actionText}
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}
      {!tests && <p>No tests</p>}
      {tests && (
        <div className="flex flex-col gap-4">
          {!tests.length && <p>No tests</p>}
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      )}
    </div>
  );
}
