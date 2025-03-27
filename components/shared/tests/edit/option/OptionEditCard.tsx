'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useTestStore } from '@/store/useTestStore';
import { IOption, QuestionType } from '@/types';
import { RxCross1 } from 'react-icons/rx';

interface Props {
  questionId: number | string;
  option: IOption;
  isFocus: boolean;
  type: QuestionType;
}

export function OptionEditCard({ questionId, option, isFocus, type }: Props) {
  const { updateOption, deleteOption } = useTestStore();
  return (
    <div className="flex gap-2 items-center" key={option.id}>
      {type === QuestionType.SINGLE && (
        <RadioGroupItem
          className="cursor-default"
          value={option.text}
          checked={false}
        />
      )}
      {type === QuestionType.MULTIPLE && (
        <Checkbox
          className="cursor-default"
          value={option.text}
          checked={false}
        />
      )}
      <Input
        variant="outline"
        className={cn('border-b-transparent', {
          'border-none': !isFocus,
        })}
        value={option.text}
        onChange={(e) => {
          updateOption(questionId, option.id, {
            text: e.target.value,
          });
        }}
        placeholder={option.text}
      />
      {isFocus && (
        <RxCross1
          className="cursor-pointer hover:text-red-600 transition-colors"
          onClick={() => deleteOption(questionId, option.id)}
        />
      )}
    </div>
  );
}
