'use client';
import parser from 'html-react-parser';
import { useGetTestResult } from '@/hooks/useGetTestResult';

export function TestResultStatistic({ uuid }: { uuid: string }) {
  const { data } = useGetTestResult(uuid);

  if (!data) return <div className="text-center py-8">Loading results...</div>;

  const totalQuestions =
    data.countCorrect +
    data.countWrong +
    data.countAlmostCorrect +
    data.countSkipped;
  const maxScore =
    data.testSession.test.questions?.reduce(
      (acc, question) => acc + question.score,
      0
    ) || 0;
  const scorePercentage =
    maxScore > 0 ? Math.round((data.score / maxScore) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Test Results</h2>
        <div className="text-4xl font-bold text-blue-600">
          {data.score} / {maxScore}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {scorePercentage}% correct
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatisticCard
          title="Correct Answers"
          value={data.countCorrect}
          total={totalQuestions}
          color="bg-green-500"
          icon="✓"
        />

        <StatisticCard
          title="Incorrect Answers"
          value={data.countWrong}
          total={totalQuestions}
          color="bg-red-500"
          icon="✗"
        />

        <StatisticCard
          title="Almost Correct"
          value={data.countAlmostCorrect}
          total={totalQuestions}
          color="bg-yellow-500"
          icon="~"
        />

        <StatisticCard
          title="Skipped Questions"
          value={data.countSkipped}
          total={totalQuestions}
          color="bg-gray-400"
          icon="—"
        />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-gray-700 mb-2">Details:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex gap-1">
            Test: {parser(data.testSession.test.title)}
          </li>
          <li>
            Completed at:{' '}
            {new Date(data.testSession.completedAt).toLocaleDateString()}
          </li>
        </ul>
      </div>
    </div>
  );
}

// Reusable Statistic Card Component
function StatisticCard({
  title,
  value,
  total,
  color,
  icon,
}: {
  title: string;
  value: number;
  total: number;
  color: string;
  icon: string;
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <span className="text-lg font-bold">
          {icon} {value}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 mt-1 text-right">
        {percentage}% of total
      </div>
    </div>
  );
}
