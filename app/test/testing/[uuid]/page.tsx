import { TestingLayout } from '@/components/shared/tests/testing/TestingLayout';

export default async function TestingPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  return <TestingLayout uuid={uuid} />;
}
