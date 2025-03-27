'use client';

import { TextEditor } from '@/components/shared/editor/TextEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTestStore } from '@/store/useTestStore';
import { IQuestion, QuestionType } from '@/types';


interface Props {
  question: IQuestion;
  focusQuestionId: number | string;
}

export function QuestionEditCardHeader({ question, focusQuestionId }: Props) {
  const updateQuestion = useTestStore((store) => store.updateQuestion);
  return (
    <div className="flex justify-between gap-4 ">
      <div className="flex flex-col w-full gap-1">
        <TextEditor
          className="text-2xl font-semibold"
          text={question.text || ''}
          setText={(text) => updateQuestion(question.id, { text: text })}
        />
        {question.description && (
          <TextEditor
            text={question.description}
            className="text-sm text-gray-600 mt-2"
            withLists={true}
            setText={(text) =>
              updateQuestion(question.id, { description: text })
            }
          />
        )}
      </div>
      {focusQuestionId === question.id && (
        <Select
          onValueChange={(value) =>
            updateQuestion(question.id, {
              type: value as QuestionType,
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              defaultValue={question.type}
              placeholder={
                question.type === QuestionType.SINGLE
                  ? 'On of list'
                  : question.type === QuestionType.MULTIPLE
                  ? 'Some of list'
                  : 'Text'
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={QuestionType.SINGLE}>On of list</SelectItem>
            <SelectItem value={QuestionType.MULTIPLE}>Some of list</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
