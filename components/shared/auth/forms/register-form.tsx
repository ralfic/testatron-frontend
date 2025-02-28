'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { RegisterData, registerSchema } from './schemas';
import { InputForm } from '@/components/shared/form/input-form';
import { Button } from '@/components/ui/button';
import { KeyRound, Mail, User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/hooks/auth-hooks/use-register';

interface Props {
  changeForm: () => void;
}

export function RegisterForm({ changeForm }: Props) {
  const { mutate: register } = useRegister();

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const onSubmit = (data: RegisterData) => {
    register(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <InputForm
            name="fullName"
            label="Full name"
            required
            placeholder="Full name"
            Icon={User}
          />
          <InputForm
            name="email"
            label="Email"
            required
            placeholder="Email"
            Icon={Mail}
          />
          <InputForm
            name="password"
            label="Password"
            required
            placeholder="Password"
            Icon={KeyRound}
          />

          <div className="flex gap-1 font-roboto">
            <p>Already have an account?</p>
            <p className="text-primary cursor-pointer" onClick={changeForm}>
              Login
            </p>
          </div>

          <Button className="mt-6" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
