'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { IOption, QuestionType } from '@/types';

interface Props {
  option: IOption;
  type: QuestionType;
}

export function OptionEditCard({ option, type }: Props) {
  return (
    <div className="flex gap-2 items-center" key={option.id}>
      {type === QuestionType.SINGLE && (
        <RadioGroupItem
          className="cursor-default"
          value={option.text}
          checked={option.isCorrect}
        />
      )}
      {type === QuestionType.MULTIPLE && (
        <Checkbox
          className="cursor-default"
          value={option.text}
          checked={option.isCorrect}
        />
      )}
      <p>{option.text}</p>
    </div>
  );
}
