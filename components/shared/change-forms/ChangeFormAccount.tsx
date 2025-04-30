'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/user/useProfile';
import { useRouter } from 'next/navigation';
import { useChangeProfile } from '@/hooks/user/useChangeProfile';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const changeAccountSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters' })
    .max(32, { message: 'Full name must be less than 32 characters' }),
});

export type changeAccountForm = z.infer<typeof changeAccountSchema>;

export function ChangeFormAccount() {
  const { refresh } = useRouter();
  const { data: profile } = useProfile();
  const { handelChangeProfile, isPending } = useChangeProfile();
  const form = useForm<changeAccountForm>({
    resolver: zodResolver(changeAccountSchema),
    defaultValues: {
      fullName: profile?.fullName || '',
    },
  });

  const onSubmit: SubmitHandler<changeAccountForm> = async (data) => {
    handelChangeProfile(data, {
      onSuccess: () => refresh(),
    });
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Account details</h2>
      <Form {...form}>
        <form
          className="pl-2 max-w-[400px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <Label>Full name</Label>
                <Input
                  {...field}
                  name="fullName"
                  required
                  placeholder="Your name"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button loading={isPending} type="submit" className="mt-4">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
