'use client';
import { IQuestion, QuestionType } from '@/types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Edit, Plus, PlusIcon } from 'lucide-react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { TextEditor } from '../../../../editor/TextEditor';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useUpdateQuestion } from '@/hooks/useUpdateQuestion';
import { useCreateQuestion } from '@/hooks/useCreateQuestion';
import { useEffect, useState } from 'react';
import { QuestionEditHeader } from './QuestionEditHeader';
import { QuestionEditOptions } from './QuestionEditOptions';

interface Props {
  question?: IQuestion;
  action: 'edit' | 'create';
  testId: number;
}

const formSchema = z.object({
  text: z.string().min(1, { message: 'Question text is required' }).max(1000, {
    message: 'Question text must be less than 1000 characters',
  }),
  description: z.string().optional(),
  type: z.nativeEnum(QuestionType),
  score: z.number().or(z.string()).transform(Number),
  options: z
    .array(
      z.object({
        text: z.string(),
        isCorrect: z.boolean(),
        questionId: z.number().or(z.undefined()),
        id: z.number().or(z.undefined()),
      })
    )
    .refine((options) => {
      const correctOptions = options.filter((option) => option.isCorrect);
      return correctOptions.length >= 1;
    }, 'Exactly one option must be marked as correct')
    .refine((options) => {
      const correctOptions = options.filter((option) => option.text !== '');
      return correctOptions.length === options.length;
    }, 'All options must have text')
    .optional(),
});

export type FormData = z.infer<typeof formSchema>;
export type FormControl = Control<FormData>;

export function QuestionEditModal({ question, action, testId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { handelUpdateQuestion, isPending: isUpdatePending } =
    useUpdateQuestion();
  const { handelCreateQuestion, isPending: isCreatePending } =
    useCreateQuestion();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: question?.text || '',
      description: question?.description || '',
      type: question?.type || QuestionType.SINGLE,
      score: question?.score || 3,
      options: question
        ? question?.options
          ? question.options
          : []
        : [
            {
              id: undefined,
              questionId: undefined,
              text: '',
              isCorrect: true,
            },
            {
              id: undefined,
              questionId: undefined,
              text: '',
              isCorrect: false,
            },
          ],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'options',
  });

  useEffect(() => {
    if (question) {
      form.reset({
        text: question.text,
        description: question.description || '',
        type: question.type,
        score: question.score,
        options: question.options,
      });
    } else {
      form.reset({
        text: '',
        description: '',
        type: QuestionType.SINGLE,
        score: 3,
        options: [
          {
            id: undefined,
            questionId: undefined,
            text: '',
            isCorrect: true,
          },
          {
            id: undefined,
            questionId: undefined,
            text: '',
            isCorrect: false,
          },
        ],
      });
    }
  }, [isOpen]);

  function onSubmit(data: FormData) {
    if (action === 'edit' && question) {
      handelUpdateQuestion(
        {
          id: question.id,
          testId: question.testId,
          data: {
            id: question.id,
            testId: question.testId,
            text: data.text,
            description: data.description || null,
            type: data.type,
            score: data.score,
            options: data.options?.map((option) => ({
              id: option.id || undefined,
              questionId: option.questionId || undefined,
              text: option.text,
              isCorrect: option.isCorrect,
            })),
          },
        },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        }
      );
    } else if (action === 'create') {
      handelCreateQuestion(
        {
          id: testId,
          data: {
            text: data.text,
            description: data.description || null,
            type: data.type,
            score: data.score,
            options: data.options,
          },
        },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        }
      );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <VisuallyHidden>
        <DialogTitle>Modal edit question</DialogTitle>
      </VisuallyHidden>
      <DialogContent className="sm:max-w-[640px] p-8 bg-card max-h-screen overflow-y-auto">
        <div>
          <h2 className="text-3xl  font-inter mb-6">
            {action === 'edit' ? 'Edit' : 'Create'} question
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <QuestionEditHeader question={question} />
                <div>
                  <FormField
                    name="text"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <TextEditor
                          setText={onChange}
                          text={value}
                          label="Question"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <TextEditor
                          setText={onChange}
                          text={value}
                          withLists
                          label="Description (optional)"
                        />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <div className="text-[0.8rem] font-medium text-destructive">
                    {form.formState.errors.options?.root?.message}
                  </div>
                  <QuestionEditOptions removeOption={remove} fields={fields} />
                  <Button
                    type="button"
                    className="mt-4 ml-2"
                    size="sm"
                    onClick={() =>
                      append({
                        text: '',
                        isCorrect: false,
                        id: undefined,
                        questionId: undefined,
                      })
                    }
                  >
                    <Plus />
                    Add option
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 mt-8 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant={'destructive'}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isUpdatePending || isCreatePending}
                >
                  {action === 'edit' ? 'Save' : 'Create'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
      <DialogTrigger asChild>
        <Button
          className={cn({
            'w-10 h-10 mx-auto rounded-full': action === 'create',
          })}
          size={action === 'edit' ? 'sm' : 'icon'}
        >
          {action === 'edit' ? <Edit /> : <PlusIcon />}
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
