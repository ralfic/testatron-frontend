'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { useAnswerQuestion } from '@/hooks/test/passing/useAnswerQuestion';
import { IAnswer, IOption, IQuestion, QuestionType } from '@/types';
import parser from 'html-react-parser';
import { useEffect, useState } from 'react';

interface Props {
  question: IQuestion;
  totalScore?: number;
  answer?: IAnswer;
  testSessionId: number;
  testSessionUuid: string;
  setCurrentQuestion: () => void;
}
export function TestingQuestion({
  question,
  totalScore,
  answer,
  testSessionId,
  testSessionUuid,
  setCurrentQuestion,
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const { handelAnswerQuestion } = useAnswerQuestion(testSessionUuid);

  useEffect(() => {
    if (answer?.selectedOptions) {
      setSelectedOptions(answer.selectedOptions);
    }
  }, []);

  const onSubmit = () => {
    handelAnswerQuestion(
      {
        id: answer?.id || -1,
        selectedOptions,
        testSessionId,
        questionId: question.id,
      },
      {
        onSuccess: () => {
          setIsChanged(false);
        },
      }
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="text-2xl font-semibold">{parser(question.text)}</div>
          <div className="text-sm editor">
            {parser(question?.description || '')}{' '}
          </div>
        </div>
        <span className="text-sm text-gray-500 inline-block self-end">
          {question.score} / {totalScore}
        </span>
      </div>
      <div className="flex flex-col gap-1 mt-6">
        {question.options?.map((option) => (
          <div className="flex gap-2 items-center py-1" key={option.id}>
            {question.type === QuestionType.SINGLE && (
              <RadioGroupItem
                value={option.text}
                onClick={() => setSelectedOptions([option])}
                disabled={!!answer && !isChanged}
                checked={!!selectedOptions?.find((o) => o.id === option.id)}
              />
            )}
            {question.type === QuestionType.MULTIPLE && (
              <Checkbox
                value={option.text}
                onCheckedChange={() =>
                  setSelectedOptions((prev) => {
                    if (prev) {
                      return !!selectedOptions?.find((o) => o.id === option.id)
                        ? prev.filter((o) => o.id !== option.id)
                        : [...prev, option];
                    }
                    return [option];
                  })
                }
                disabled={!!answer && !isChanged}
                checked={!!selectedOptions?.find((o) => o.id === option.id)}
              />
            )}

            <Label className="edit text-lg">{option.text}</Label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Button
          className="mt-4 w-full inline-block mx-auto max-w-[400px]"
          disabled={selectedOptions.length === 0}
          onClick={() => {
            if (isChanged || !answer) {
              onSubmit();
            } else {
              setCurrentQuestion();
            }
          }}
        >
          {isChanged ? 'Submit' : !!answer ? 'Go to next' : 'Submit'}
        </Button>
        <Button
          onClick={() => {
            if (answer) {
              setIsChanged((prev) => !prev);
            }
          }}
          variant={'link'}
          disabled={!!answer}
        >
          {isChanged ? 'Cancel' : 'Change the answer'}
        </Button>
      </div>
    </div>
  );
}
