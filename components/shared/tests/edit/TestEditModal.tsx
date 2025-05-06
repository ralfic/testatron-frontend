'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ITest } from '@/types';
import { useCreateTest } from '@/hooks/test/useCreateTest';
import { useUpdateTestInfo } from '@/hooks/test/editing/useUpdateTestInfo';
import { useEffect, useState } from 'react';
import { TextEditor } from '../../editor/TextEditor';

const firmSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(32, { message: 'Title must be less than 32 characters' }),
  description: z.string(),
});

type FormData = z.infer<typeof firmSchema>;

interface IProps {
  test?: ITest;
  action: 'edit' | 'create';
}
export function TestEditModal({ action, test }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handelCreateTest, isPending: isCreatePending } = useCreateTest();
  const { handelUpdateTest, isPending: isUpdatePending } = useUpdateTestInfo();
  const form = useForm<{ title: string; description: string }>({
    resolver: zodResolver(firmSchema),
    defaultValues: {
      title: test?.title || '',
      description: test?.description || '',
    },
  });

  useEffect(() => {
    if (test) {
      form.reset({
        title: test.title,
        description: test.description || '',
      });
    }
  }, [isOpen]);

  function onSubmit(data: FormData) {
    if (action === 'edit' && test) {
      handelUpdateTest(
        {
          id: test.id,
          data: data,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        }
      );
    }

    if (action === 'create') {
      handelCreateTest(
        { title: data.title, description: data.description },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        }
      );
    }
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <VisuallyHidden>
        <DialogTitle>Modal edit test information</DialogTitle>
      </VisuallyHidden>
      <DialogContent className="sm:max-w-[580px] p-8 bg-card max-h-screen overflow-y-auto">
        <div>
          <h2 className="text-3xl  font-inter mb-6">
            {action === 'edit' ? 'Edit test information' : 'Create new test'}
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <FormItem>
                      <TextEditor
                        setText={onChange}
                        text={value}
                        label="Title"
                      />
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
                        label="Description"
                        withLists
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 mt-8 justify-end">
                <DialogClose asChild>
                  <Button type="button" variant={'destructive'}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {action === 'edit' ? 'Save' : 'Create'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
      <DialogTrigger asChild>
        <Button size="sm" disabled={isCreatePending || isUpdatePending}>
          {action === 'edit' ? <Edit /> : 'Create test'}
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
