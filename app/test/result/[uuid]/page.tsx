import { TestResultStatistic } from '@/components/shared/tests/result/TestResultStatistic';

export default async function TestResultPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  return <TestResultStatistic uuid={uuid} />;
}
