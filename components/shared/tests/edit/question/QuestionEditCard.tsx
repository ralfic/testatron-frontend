'use client';

import { RadioGroup } from '@/components/ui/radio-group';
import { IQuestion } from '@/types';
import { OptionEditCard } from '../option/OptionEditCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import parser from 'html-react-parser';
import { Trash } from 'lucide-react';
import { QuestionEditModal } from './modal/QuestionEditModal';
import { useDeleteQuestion } from '@/hooks/useDeleteQuestion';

interface Props {
  question: IQuestion;
  totalScore?: number;
}

export function QuestionEditCard({ question, totalScore }: Props) {
  const { handelDeleteQuestion, isPending } = useDeleteQuestion();
  return (
    <div
      className={cn('flex gap-2 rounded-xl py-4 px-5 justify-between bg-card')}
    >
      <div className="w-full">
        <div>
          <div className="text-xl font-semibold">{parser(question.text)}</div>
          {question.description && (
            <div className=" text-gray-600 mt-2 editor">
              {parser(question.description)}
            </div>
          )}
        </div>
        <RadioGroup>
          <div className="mt-2 flex flex-col gap-2.5">
            {question.options?.map((option) => (
              <OptionEditCard
                key={option.id}
                option={option}
                type={question.type}
              />
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="flex gap-2 ">
        <div className="  text-sm text-white  text-nowrap inline-flex items-center justify-center border border-border p-2 bg-primary/35 rounded-lg h-9">
          {question.score} / {totalScore}
        </div>
        <div className="flex flex-col gap-2">
          <QuestionEditModal
            question={question}
            action="edit"
            testId={question.testId}
          />
          <Button
            variant="destructive"
            size={'sm'}
            disabled={isPending}
            onClick={() =>
              handelDeleteQuestion({ id: question.id, testId: question.testId })
            }
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
}
