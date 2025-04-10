'use client';
import { Container } from '@/components/shared/Container';
import { TestEditHeader } from './header/TestEditHeader';
import { TestEditQuestions } from './TestEditQuestions';
import { useGetTestById } from '@/hooks/useGetTestById';

interface Props {
  testId: number;
}

export function TestEditLayout({ testId }: Props) {
  const { isLoading, data } = useGetTestById(testId);

  return (
    <div>
      <TestEditHeader test={data} />
      <Container>
        <TestEditQuestions isTestLoading={isLoading} test={data} />
      </Container>
    </div>
  );
}
