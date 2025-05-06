import { TestStatistic } from '@/components/shared/tests/statistic/TestStatistic';

export default async function TestStatisticPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div>
      <TestStatistic testId={Number(id)} />
    </div>
  );
}
