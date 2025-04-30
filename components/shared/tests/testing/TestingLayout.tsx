'use client';
import { TestingQuestions } from './TestingQuestions';
import { useGetTestSession } from '@/hooks/test/useGetTestSession';

export function TestingLayout({ uuid }: { uuid: string }) {
  const { data, isLoading } = useGetTestSession(uuid);
  return <div>{!isLoading && data && <TestingQuestions data={data} />}</div>;
}
