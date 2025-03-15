import { TestEditLayout } from '@/components/shared/tests/edit/TestEditLayout';

export default async function CreateTest({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <TestEditLayout testId={Number(id)} />;
}
