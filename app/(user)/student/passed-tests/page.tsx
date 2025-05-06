import { TestPassedList } from '@/components/shared/tests/TestPassedList';

export default function PassedTestsPage() {
  return (
    <div className="h-full flex flex-col gap-4">
      <TestPassedList />
    </div>
  );
}
