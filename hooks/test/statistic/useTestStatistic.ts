import { ITestStatistic } from '@/types';
import { format } from 'date-fns';

export function useTestStatistic(data: ITestStatistic | undefined) {
  const averageScore =
    data?.testSessions?.reduce(
      (acc, session) => acc + session?.testResult?.score || 0,
      0
    ) || 0;
  const maxScore =
    data?.questions?.reduce((acc, question) => acc + question.score, 0) || 0;
  const averageScorePercentage = ((averageScore / maxScore) * 100).toFixed(2);
  const questionsCount = data?.questions?.length || 0;
  const sessionsCount = data?.testSessions?.length || 0;
  const createdAt = data?.createdAt
    ? format(data.createdAt, 'dd/MM/yyyy HH:mm')
    : '**/**/**** **:**';
  const expiresAt = data?.expiresAt
    ? format(data.expiresAt, 'dd/MM/yyyy HH:mm')
    : '**/**/**** **:**';

  return {
    averageScore,
    maxScore,
    averageScorePercentage,
    questionsCount,
    sessionsCount,
    createdAt,
    expiresAt,
  };
}
