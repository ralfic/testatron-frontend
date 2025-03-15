'use client';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { useTestStore } from '@/store/useTestStore';
import { IOption } from '@/types';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

interface Props {
  questionId: number | string;
  option: IOption;
  isFocus: boolean;
}

export function OptionEditCard({ questionId, option, isFocus }: Props) {
  const [value, setValue] = useState(option.text);
  const { updateOption, deleteOption } = useTestStore();
  return (
    <div className="flex gap-2 items-center" key={option.id}>
      <RadioGroupItem value={option.text} />
      <Input
        variant="outline"
        className=" border-b-transparent "
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          updateOption(questionId, option.id, {
            text: e.target.value,
          });
        }}
        placeholder={option.text}
      />
      {isFocus && (
        <RxCross1
          className="cursor-pointer "
          onClick={() => deleteOption(questionId, option.id)}
        />
      )}
    </div>
  );
}
