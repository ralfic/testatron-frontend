'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChangeUserPassword } from '@/hooks/user/useChangeUserPassword';

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(4, { message: 'Input a valid password' }),
  confirmNewPassword: z.string().min(4, { message: 'Input a valid password' }),
});

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export function ChangeFormPassword() {
  const { handelChangePassword, isPending } = useChangeUserPassword();

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    const { newPassword, currentPassword, confirmNewPassword } = data;

    handelChangePassword(
      {
        newPassword,
        currentPassword,
        confirmNewPassword,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Change password</h2>
      <Form {...form}>
        <form className="pl-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 max-w-[400px]">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Current password</Label>
                  <Input {...field} required placeholder="Current password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>New password</Label>
                  <Input {...field} required placeholder="New password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>Confirm new password</Label>
                  <Input
                    {...field}
                    required
                    placeholder="Confirm new password"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-4" disabled={isPending}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
