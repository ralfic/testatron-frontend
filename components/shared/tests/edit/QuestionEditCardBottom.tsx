'use client';

import { Switch } from '@/components/ui/switch';
import { useTestStore } from '@/store/useTestStore';
import { IQuestion } from '@/types';
import { Trash } from 'lucide-react';
import { MdDescription } from 'react-icons/md';

interface Props {
  question: IQuestion;
}

export function QuestionEditCardBottom({ question }: Props) {
  const { deleteQuestion, updateQuestion } = useTestStore();

  return (
    <div className="border-t pt-3 flex gap-4 justify-end items-center mt-4">
      <div className="before:w-px pr-4 before:h-full before:bg-gray-400 before:top-0 before:right-0 before:absolute relative">
        <Trash
          className="cursor-pointer "
          onClick={() => deleteQuestion(question.id)}
        />
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
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            Require question
          </label>
        </div>
        <MdDescription
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            if (question.description) {
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
