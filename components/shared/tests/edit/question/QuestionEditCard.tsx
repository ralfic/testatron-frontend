import { RadioGroup } from '@/components/ui/radio-group';
import { useTestStore } from '@/store/useTestStore';
import { IQuestion } from '@/types';
import { OptionEditCard } from '../option/OptionEditCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QuestionEditCardBottom } from './QuestionEditCardBottom';
import { useState } from 'react';
import { QuestionEditCardHeader } from './QuestionEditCardHeader';
import { QuestionEditAnswers } from './QuestionEditAnswers';

interface Props {
  question: IQuestion;
  focusQuestionId: string | number;
  setFocus: () => void;
}

export function QuestionEditCard({
  question,
  focusQuestionId,
  setFocus,
}: Props) {
  const addOption = useTestStore((store) => store.addOption);
  const [isChoosingCorrectAnswers, setIsChoosingCorrectAnswers] =
    useState(false);

  return (
    <div>
      <div
        key={question.id}
        className={cn(
          'flex gap-2 bg-white rounded-xl py-4 px-5 flex-col',
          focusQuestionId === question.id && 'border-l-4 border-l-secondary'
        )}
        onClick={setFocus}
      >
        {isChoosingCorrectAnswers && (
          <QuestionEditAnswers
            question={question}
            closeChoosingCorrectAnswers={() =>
              setIsChoosingCorrectAnswers(false)
            }
          />
        )}
        {!isChoosingCorrectAnswers && (
          <div>
            <div className="w-full">
              <QuestionEditCardHeader
                question={question}
                focusQuestionId={focusQuestionId}
              />
              <RadioGroup>
                <div className="mt-2 flex flex-col gap-1">
                  {question.options?.map((option) => (
                    <OptionEditCard
                      key={option.id}
                      questionId={question.id}
                      option={option}
                      isFocus={question.id === focusQuestionId}
                      type={question.type}
                    />
                  ))}
                  {focusQuestionId === question.id && (
                    <Button
                      className="self-start mt-2"
                      size={'sm'}
                      onClick={() => addOption(question.id)}
                    >
                      Add new option
                    </Button>
                  )}
                </div>
              </RadioGroup>
            </div>

            {focusQuestionId === question.id && (
              <QuestionEditCardBottom
                question={question}
                onClick={() => setIsChoosingCorrectAnswers((prev) => !prev)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
