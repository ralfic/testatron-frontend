'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AnswerStatus, IAnswer, IQuestion, QuestionType } from '@/types';
import { cn } from '@/lib/utils';
import parser from 'html-react-parser';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface Props {
  question: IQuestion;
  answer?: IAnswer;
}

export function QuestionResult({ question, answer }: Props) {
  return (
    <div
      className={cn(
        'flex gap-2 rounded-xl py-4 px-5 justify-between bg-card border-l-2',
        {
          ' border-orange-500': answer?.status === AnswerStatus.ALMOST_CORRECT,
          ' border-green-500': answer?.status === AnswerStatus.CORRECT,
          ' border-red-500': answer?.status === AnswerStatus.INCORRECT,
          ' border-gray-500': answer?.status === AnswerStatus.SKIPPED,
        }
      )}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <div className="text-xl font-semibold">{parser(question.text)}</div>
            {question.description && (
              <div className=" text-gray-600 mt-1 editor">
                {parser(question.description)}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <div className="  text-sm  border border-gray-400  text-nowrap inline-flex items-center justify-center  p-2 bg-muted rounded-lg h-9">
              {answer?.score} score
            </div>
          </div>
        </div>
        <Separator className="my-2" />
        <RadioGroup>
          <div className=" flex flex-col gap-1.5">
            {question.options?.map((option) => (
              <div className="flex gap-4 items-center" key={option.id}>
                <div className="flex gap-2 items-center">
                  {question.type === QuestionType.SINGLE && (
                    <RadioGroupItem
                      className={cn('cursor-default ', {
                        ' border-green-500 fill-green-500 stroke-green-500':
                          option.isCorrect,
                      })}
                      value={option.text}
                      checked={option.isCorrect}
                    />
                  )}
                  {question.type === QuestionType.MULTIPLE && (
                    <Checkbox
                      className={cn('cursor-default ', {
                        'data-[state=checked]:bg-green-500 border-green-500':
                          option.isCorrect,
                      })}
                      value={option.text}
                      checked={option.isCorrect}
                    />
                  )}
                  <p>{option.text}</p>
                </div>
                <p
                  className={cn('text-sm', {
                    'text-green-500': option.isCorrect,
                    'text-red-500': !option.isCorrect,
                  })}
                >
                  {answer?.selectedOptions?.find((o) => o.id === option.id)
                    ? "- You've selected"
                    : ''}
                </p>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
