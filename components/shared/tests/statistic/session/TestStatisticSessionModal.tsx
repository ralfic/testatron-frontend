'use client';
import { QuestionResult } from '@/components/shared/tests/result/question/QuestionResult';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IQuestion, ITestSessionStatistic } from '@/types';
import { format } from 'date-fns';
import { BarResultScore } from '@/components/shared/tests/result/BarResultScore';

export function TestStatisticSessionModal({
  session,

  questionsCount,
  questions,
  isOpen,
  setIsOpen,
}: {
  session: ITestSessionStatistic;
  questionsCount: number;
  questions?: IQuestion[];
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{session.guestName}</DialogTitle>
          <DialogDescription>
            <div className="flex gap-0.5 mb-2 flex-col">
              <div>
                Started at:{' '}
                {format(new Date(session.createdAt), 'dd/MM/yyyy HH:mm')}
              </div>
              <div>
                Ended at:{' '}
                {session.endedAt &&
                  format(new Date(session.endedAt), 'dd/MM/yyyy HH:mm')}
              </div>
            </div>
            <BarResultScore
              session={session}
              questionsCount={questionsCount}
              isShowPercentage
            />
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {session.answers.map((answer) => {
            const question = questions?.find((q) => q.id === answer.questionId);
            return (
              question && <QuestionResult question={question} answer={answer} />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
