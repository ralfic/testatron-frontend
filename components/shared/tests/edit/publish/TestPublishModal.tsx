'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import parser from 'html-react-parser';
import { useState } from 'react';
import { usePublishTest } from '@/hooks/usePublishTest';
import { TestPublishExpireAt } from './TestPublishExpireAt';
import { ITest, TestStatus } from '@/types';
import { useForm } from 'react-hook-form';
import { FormControl, FormField, Form } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useExpiresAt } from '@/hooks/useExpiresAt';

export function TestPublishModal({ test }: { test: ITest }) {
  const { expiryOptionsDays, expiryOptionsHours } = useExpiresAt();

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: {
      expiresAt: {
        day: expiryOptionsDays[0],
        hour: expiryOptionsHours[0],
      },
      showCorrectAnswers: false,
      showQuestionScore: false,
    },
  });
  const { handelPublishTest, isPending } = usePublishTest();
  const [isOpen, setIsOpen] = useState(false);

  if (!test) return null;

  function onSubmit(data: {
    expiresAt: { day: number; hour: number };
    showCorrectAnswers: boolean;
    showQuestionScore: boolean;
  }) {
    handelPublishTest(
      {
        id: test.id,
        data: {
          ...data,
          expiresAt: new Date(data.expiresAt.day + data.expiresAt.hour),
        },
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480x] p-8 bg-card max-h-screen overflow-y-auto">
        <DialogHeader className="border-b pb-2">
          <DialogTitle>Publish test</DialogTitle>
          <DialogDescription>
            Publish test and send it to your students
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex  gap-1">
            <span className="text-gray-500">Title:</span>
            {parser(test?.title)}
          </div>
          <div className="editor " >
            <span className="text-gray-500 dark:text-gray-200">Description:</span>
            {parser(test?.description || '')}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <p className="text-gray-500 ">Expires at:</p>
                <TestPublishExpireAt fromControl={form.control} />
              </div>

              <div>
                <p className="text-gray-500">Settings</p>
                <div className="flex flex-col  gap-2 pb-4 ">
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p>Correct answers</p>
                      <p className="text-sm text-gray-500">
                        Show correct answers after submission
                      </p>
                    </div>
                    <FormField
                      name="showCorrectAnswers"
                      control={form.control}
                      render={({ field }) => (
                        <FormControl>
                          <Switch
                            onCheckedChange={field.onChange}
                            checked={field.value}
                          />
                        </FormControl>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <p>Score for answers</p>
                      <p className="text-sm text-gray-500">
                        Show score for each answer
                      </p>
                    </div>
                    <FormField
                      name="showQuestionScore"
                      control={form.control}
                      render={({ field }) => (
                        <FormControl>
                          <Switch
                            onCheckedChange={field.onChange}
                            checked={field.value}
                          />
                        </FormControl>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4">
                <Button className="w-full" disabled={isPending} type="submit">
                  Publish
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
      <DialogTrigger disabled={test.status === TestStatus.PUBLISHED} asChild>
        <Button disabled={test.status === TestStatus.PUBLISHED}>Publish</Button>
      </DialogTrigger>
    </Dialog>
  );
}
