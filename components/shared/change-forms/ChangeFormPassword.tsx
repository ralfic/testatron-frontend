'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputForm } from '../form/InputForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(4, { message: 'Input a valid password' }),
  confirmNewPassword: z.string().min(4, { message: 'Input a valid password' }),
});

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export function ChangeFormPassword() {
  const { changePassword } = useAuth();

  const methods = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    const { newPassword, currentPassword, confirmNewPassword } = data;

    changePassword(
      {
        newPassword,
        currentPassword,
        confirmNewPassword,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Change password</h2>
      <FormProvider {...methods}>
        <form className="pl-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 max-w-[400px]">
            <InputForm
              name="currentPassword"
              label="Current password"
              required
              placeholder="Current password"
            />
            <InputForm
              name="newPassword"
              label="New password"
              required
              placeholder="New password"
            />
            <InputForm
              name="confirmNewPassword"
              label="Confirm new password"
              required
              placeholder="Confirm new password"
            />
          </div>
          <Button type="submit" className="mt-4">
            Save
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
