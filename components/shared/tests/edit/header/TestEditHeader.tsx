'use client';

import { Container } from '@/components/shared/Container';
import { TestPublishModal } from '../publish/TestPublishModal';
import { ITest } from '@/types';
import UserInfo from '@/components/shared/user/UserInfo';

export function TestEditHeader({ test }: { test?: ITest }) {
  return (
    <div className="bg-card fixed top-0 pt-2 left-0 right-0 z-10 pb-3">
      <Container className="pt-4  flex flex-col gap-2 ">
        <div className="flex justify-between">
          <div className="flex gap-2 items-end">
            <h1 className="text-4xl font-semibold">Edit test</h1>
          </div>
          <div className='flex gap-4'>
            <UserInfo size="sm" />
            {test && <TestPublishModal test={test} />}
          </div>
        </div>
      </Container>
    </div>
  );
}
