'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { useJoinTest } from '@/hooks/useJoinTest';

const formSchema = z.object({
  code: z.string().min(1, { message: 'Code is required' }),
  guestName: z.string().min(1, { message: 'Name is required' }),
});

export type JoinTestFormData = z.infer<typeof formSchema>;

export function JoinTest() {
  const {handelJoinTest, isPending} = useJoinTest()
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: searchParams.get('code') || '',
      guestName: '',
    },
  });

  const onSubmit = (data: JoinTestFormData) => {
    handelJoinTest(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="max-w-[400px] w-full flex gap-6 flex-col mx-auto items-center tracking-wider">
      <h1 className="text-4xl font-semibold">Join Test</h1>
      <div className="flex gap-4 flex-col w-full">
        <Form {...form}>
          <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 ">
              <FormField
                name="code"
                render={({ field }) => (
                 <FormItem> <Label >Code</Label><Input placeholder="Code" {...field} type="text" /><FormMessage /></FormItem>
                )}
              />
              <FormField
                name="guestName"
                render={({ field }) => (
                  <FormItem> <Label>Your name</Label><Input placeholder="Your name" {...field} type="text" /><FormMessage /></FormItem>
                )}
              />
            </div>
            <Button className="mt-4 w-full" type="submit" disabled={isPending}>
              Join
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
