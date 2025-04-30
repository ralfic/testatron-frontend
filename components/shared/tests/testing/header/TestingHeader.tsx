'use client';
import { Button } from '@/components/ui/button';
import { useSendResponseTest } from '@/hooks/test/passing/useSendResponseTest';
import { ITestSession, TestSessionStatus } from '@/types';

export function TestingHeader({ data }: { data: ITestSession }) {
  const { handelSendResponseTest, isPending } = useSendResponseTest();

  const onSendResponseTest = () => {
    if (data.status !== TestSessionStatus.FINISHED) {
      handelSendResponseTest(data.uuid);
    }
  };

  return (
    <div className="w-full bg-card h-16 py-4 px-8 flex items-center gap-4 justify-between">
      {data && <div>Session: {data.test.code}</div>}
      <Button
        onClick={onSendResponseTest}
        loading={isPending}
        disabled={isPending || data.status === TestSessionStatus.FINISHED}
      >
        Send test
      </Button>
    </div>
  );
}
