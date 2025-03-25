'use client';

import { ITest } from '@/types';
import { TestCard } from './TestCard';
import { ReactElement } from 'react';

interface Props {
  tests: Omit<ITest, 'questions'>[] | undefined;
  title: 'Latest tests' | 'Ended tests' | 'Ongoing tests';
  isLoading: boolean;
  button: ReactElement;
}

export function TestsList({ tests, title, button, isLoading }: Props) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-3xl">{title}</h3>
        {button}
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
