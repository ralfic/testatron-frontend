'use client';
import { QuestionType } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { RxCross1 } from 'react-icons/rx';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form';

type TQuestionEdit = {
  text: string;
  type: QuestionType;
  score: number;
  options?:
    | {
        text: string;
        isCorrect: boolean;
        id?: number | undefined;
        questionId?: number | undefined;
      }[]
    | undefined;
  description?: string | undefined;
};

interface Props {
  removeOption: UseFieldArrayRemove;
  fields: FieldArrayWithId<TQuestionEdit, 'options', 'id'>[];
}

export function QuestionEditOptions({ removeOption, fields }: Props) {
  const form = useFormContext();

  return (
    <RadioGroup>
      <div className="mt-2 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
        {fields.map((option, index) => (
          <div
            className={cn(
              'flex items-center gap-2  rounded-md cursor-pointer hover:bg-secondary/10 px-2 py-1 group',
              {
                'bg-primary/10': option.isCorrect,
              }
            )}
            key={option.id}
          >
            {form.getValues('type') === QuestionType.SINGLE && (
              <FormField
                name={`options.${index}.isCorrect`}
                render={({ field: { onChange, value } }) => {
                  const handleChange = () => {
                    fields.forEach((_, i) => {
                      form.setValue(`options.${i}.isCorrect`, false);
                    });
                    onChange(true);
                  };
                  return (
                    <RadioGroupItem
                      value={value}
                      checked={value}
                      onClick={handleChange}
                    />
                  );
                }}
              />
            )}
            {form.getValues('type') === QuestionType.MULTIPLE && (
              <FormField
                name={`options.${index}.isCorrect`}
                render={({ field: { onChange, value } }) => (
                  <Checkbox checked={value} onCheckedChange={onChange} />
                )}
              />
            )}
            <div className="flex justify-between w-full gap-4 items-center">
              <FormField
                name={`options.${index}.text`}
                render={({ field: { onChange, value } }) => (
                  <FormItem className="w-full">
                    <Input
                      type="text"
                      onChange={onChange}
                      value={value}
                      className="w-full"
                      name={`options.${index}.text`}
                      variant="outline"
                      placeholder={'Option ' + (index + 1)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <RxCross1
                className="cursor-pointer hover:text-red-600 transition-colors invisible group-hover:visible"
                onClick={() => removeOption(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
