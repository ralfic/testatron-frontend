import { cn } from '@/lib/utils';
import { ITestSessionStatistic } from '@/types';

export function BarResultScore({
  session,
  questionsCount,
  isShowPercentage = false,
  className,
}: {
  session: ITestSessionStatistic;
  questionsCount: number;
  isShowPercentage?: boolean;
  className?: string;
}) {
  const correctAnswersPercentage =
    +((session?.testResult?.countCorrect / questionsCount) * 100).toFixed(2) ||
    0;
  const wrongAnswersPercentage =
    +((session?.testResult?.countWrong / questionsCount) * 100).toFixed(2) || 0;
  const almostCorrectAnswersPercentage =
    +((session?.testResult?.countAlmostCorrect / questionsCount) * 100).toFixed(
      2
    ) || 0;
  const skippedQuestionsPercentage =
    +((session?.testResult?.countSkipped / questionsCount) * 100).toFixed(2) ||
    0;
  const countSkipped = session?.testResult?.countSkipped;
  const countCorrect = session?.testResult?.countCorrect;
  const countWrong = session?.testResult?.countWrong;
  const countAlmostCorrect = session?.testResult?.countAlmostCorrect;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={cn(
          'bg-card rounded w-full h-[35px] flex overflow-hidden',
          className
        )}
      >
        <div
          className="bg-green-400 h-full  items-center flex"
          style={{
            width: `${correctAnswersPercentage}%`,
          }}
        >
          {countCorrect > 0 && (
            <div className="text-center text-white bg-green-600  w-fit px-2 rounded translate-x-1">
              {countCorrect}
            </div>
          )}
        </div>
        <div
          className="bg-yellow-400 h-full  items-center flex"
          style={{
            width: `${almostCorrectAnswersPercentage}%`,
          }}
        >
          {countAlmostCorrect > 0 && (
            <div className="text-center text-white bg-yellow-600 w-fit px-2 rounded translate-x-1">
              {countAlmostCorrect}
            </div>
          )}
        </div>
        <div
          className="bg-red-400  h-full  items-center flex"
          style={{
            width: `${wrongAnswersPercentage}%`,
          }}
        >
          {countWrong > 0 && (
            <div className="text-center text-white bg-red-600 w-fit px-2 rounded translate-x-1">
              {countWrong}
            </div>
          )}
        </div>
        <div
          className="bg-gray-400  h-full  items-center flex"
          style={{
            width: `${skippedQuestionsPercentage}%`,
          }}
        >
          {countSkipped > 0 && (
            <div className="text-center text-white bg-gray-600 w-fit px-2 rounded translate-x-1">
              {countSkipped}
            </div>
          )}
        </div>
      </div>
      {isShowPercentage && (
        <div className="flex gap-4 bg-card rounded p-2">
          <div className="text-green-400">
            Correct: {correctAnswersPercentage}%
          </div>
          <div className="text-red-400">Wrong: {wrongAnswersPercentage}%</div>
          <div className="text-yellow-400">
            Almost correct: {almostCorrectAnswersPercentage}%
          </div>
          <div className="text-gray-400">
            Skipped: {skippedQuestionsPercentage}%
          </div>
        </div>
      )}
    </div>
  );
}
