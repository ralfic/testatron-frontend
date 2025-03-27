'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTestStore } from '@/store/useTestStore';
import { IQuestion } from '@/types';
import { Trash } from 'lucide-react';
import { MdDescription } from 'react-icons/md';

interface Props {
  question: IQuestion;
  onClick: () => void;
}

export function QuestionEditCardBottom({ question, onClick }: Props) {
  const { deleteQuestion, updateQuestion } = useTestStore();

  return (
    <div className="border-t pt-3 flex gap-4 justify-end items-center mt-4">
      <div className="flex justify-between w-full items-center">
        <div>
          <Button size={'sm'} variant={'outline'} onClick={() => onClick()}>
            Answer
          </Button>
        </div>
        <div className="before:w-px pr-4 before:h-full before:bg-gray-400 before:top-0 before:right-0 before:absolute relative">
          <Trash
            className="cursor-pointer hover:text-primary transition-colors"
            onClick={() => deleteQuestion(question.id)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="require"
            onCheckedChange={(checked) =>
              updateQuestion(question.id, { isRequired: checked })
            }
            checked={question.isRequired}
          />
          <label
            htmlFor="require"
            className="text-sm text-nowrap font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Require question
          </label>
        </div>
        <MdDescription
          className="w-6 h-6 cursor-pointer hover:text-primary transition-colors"
          onClick={() => {
            if (!question.description) {
              updateQuestion(question.id, { description: 'Description' });
            } else {
              updateQuestion(question.id, { description: null });
            }
          }}
        />
      </div>
    </div>
  );
}
