import { queryClient } from '@/api/queryClient';
import { TestEditLayout } from '@/components/shared/tests/edit/TestEditLayout';
import { TestService } from '@/services/test.service';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
export default async function EditTestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await queryClient.prefetchQuery(
    TestService.getTestByIdQueryOptions(Number(id))
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TestEditLayout testId={Number(id)} />
    </HydrationBoundary>
  );
}
