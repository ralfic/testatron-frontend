'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { RegisterData, registerSchema } from './schemas';
import { InputForm } from '@/components/shared/form/InputForm';
import { Button } from '@/components/ui/button';
import { KeyRound, Mail, User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  changeForm: () => void;
}

export function RegisterForm({ changeForm }: Props) {
  const { registerUser } = useAuth();

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
    registerUser(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
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
          </div>

          <div className="flex gap-1 font-roboto">
            <p>Already have an account?</p>
            <p className="text-primary cursor-pointer" onClick={changeForm}>
              Login
            </p>
          </div>

          <Button className="mt-4" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
