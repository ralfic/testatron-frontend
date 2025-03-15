import { TextEditor } from '@/components/editor/TextEditor';
import { RadioGroup } from '@/components/ui/radio-group';
import { useTestStore } from '@/store/useTestStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IQuestion, QuestionType } from '@/types';
import { OptionEditCard } from './OptionEditCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QuestionEditCardBottom } from './QuestionEditCardBottom';
import { Input } from '@/components/ui/input';

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
  const { updateQuestion, addOption } = useTestStore();

  console.log(question);

  return (
    <div
      key={question.id}
      className={cn(
        'flex gap-2 bg-white rounded-xl py-4 px-5 flex-col',
        focusQuestionId === question.id && 'border-l-4 border-l-cyan-400'
      )}
      onClick={setFocus}
    >
      <div className="w-full ">
        <div className="flex justify-between gap-4">
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
                setText={(text) =>
                  updateQuestion(question.id, { description: text })
                }
              />
            )}
          </div>
          {focusQuestionId === question.id && (
            <Select
              onValueChange={(value) =>
                updateQuestion(question.id, { type: value as QuestionType })
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
                <SelectItem value={QuestionType.MULTIPLE}>
                  Some of list
                </SelectItem>
                <SelectItem value={QuestionType.TEXT}>Text</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        {question.type === QuestionType.SINGLE && (
          <RadioGroup className="mt-4">
            <div className=" flex flex-col gap-1">
              {question.options?.map((option) => (
                <OptionEditCard
                  key={option.id}
                  questionId={question.id}
                  option={option}
                  isFocus={question.id === focusQuestionId}
                />
              ))}
              {focusQuestionId === question.id && (
                <Button
                  className="self-start mt-2"
                  variant="outline"
                  size={'sm'}
                  onClick={() => addOption(question.id)}
                >
                  Add new option
                </Button>
              )}
            </div>
          </RadioGroup>
        )}
        {question.type === QuestionType.TEXT && (
          <p className="mt-4 text-sm text-gray-500 border-b border-gray-400">
            Text
          </p>
        )}
      </div>
      {focusQuestionId === question.id && (
        <QuestionEditCardBottom question={question} />
      )}
    </div>
  );
}
