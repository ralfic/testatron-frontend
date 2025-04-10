import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { IQuestion, QuestionType } from '@/types';
import { Input } from '@/components/ui/input';

interface Props {
  question?: IQuestion;
}

export function QuestionEditHeader({ question }: Props) {
  return (
    <div className="flex w-full gap-4">
      <FormField
        name="type"
        render={({ field: { onChange, value } }) => (
          <FormItem className="w-full">
            <FormLabel>Question type</FormLabel>
            <Select onValueChange={onChange} defaultValue={value}>
              <SelectTrigger>
                <SelectValue
                  defaultValue={question?.type ?? QuestionType.SINGLE}
                  placeholder={value}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={QuestionType.SINGLE}>On of list</SelectItem>
                <SelectItem value={QuestionType.MULTIPLE}>
                  Some of list
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name="score"
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormLabel>Score</FormLabel>
            <Input
              type="number"
              onChange={onChange}
              value={value}
              className="border"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
