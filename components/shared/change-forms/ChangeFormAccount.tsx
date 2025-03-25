'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputForm } from '../form/InputForm';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useRouter } from 'next/navigation';
import { useChangeProfile } from '@/hooks/useChangeProfile';

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
  const methods = useForm<changeAccountForm>({
    resolver: zodResolver(changeAccountSchema),
    defaultValues: {
      fullName: profile?.fullName || '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<changeAccountForm> = async (data) => {
    handelChangeProfile(data, {
      onSuccess: () => refresh(),
    });
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Account details</h2>
      <FormProvider {...methods}>
        <form className="pl-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-[400px]">
            <InputForm
              name="fullName"
              label="Display name"
              required
              placeholder="Your name"
            />
          </div>

          <Button loading={isPending} type="submit" className="mt-4">
            Save
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
