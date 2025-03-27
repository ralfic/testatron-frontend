'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { IQuestion, QuestionType } from '@/types';

interface Props {
  question: IQuestion;
  closeChoosingCorrectAnswers: () => void;
}

export function QuestionEditAnswers({
  question,
  closeChoosingCorrectAnswers,
}: Props) {
  const updateQuestion = useTestStore((store) => store.updateQuestion);
  const updateOption = useTestStore((store) => store.updateOption);

  return (
    <div>
      <div className="border-b pb-2">
        <p className="text-lg font-medium">Chose correct option</p>
      </div>
      <div className="pt-4">
        <div className="flex justify-between items-center gap-4">
          <p className="text-gray-500">Answers</p>
          <div className="flex gap-2  items-center">
            <Input
              type="number"
              className="w-20"
              value={question.score}
              onChange={(e) =>
                updateQuestion(question.id, {
                  score: Number(e.target.value),
                })
              }
            />
            <span>Score</span>
          </div>
        </div>
        <div>
          <RadioGroup>
            <div className="mt-2 flex flex-col gap-1.5">
              {question.options?.map((option) => (
                <div
                  className={cn(
                    'flex items-center gap-2 py-2.5 px-2 rounded-md cursor-pointer',
                    {
                      'bg-primary/10': option.isCorrect,
                    }
                  )}
                  key={option.id}
                  onClick={() => {
                    updateOption(question.id, option.id, {
                      isCorrect: !option.isCorrect,
                    });
                  }}
                >
                  {question.type === QuestionType.SINGLE && (
                    <RadioGroupItem
                      value={option.isCorrect.toString()}
                      checked={option.isCorrect}
                    />
                  )}
                  {question.type === QuestionType.MULTIPLE && (
                    <Checkbox checked={option.isCorrect} />
                  )}
                  <Label className="cursor-pointer text-base">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="border-t mt-4 pt-4 flex justify-end">
          <Button size={'sm'} onClick={() => closeChoosingCorrectAnswers()}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
