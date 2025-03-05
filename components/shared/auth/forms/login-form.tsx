'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { LoginData, loginFormSchema } from './schemas';
import { InputForm } from '@/components/shared/form/input-form';
import { Button } from '@/components/ui/button';
import { KeyRound, Mail } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';

interface Props {
  changeForm: () => void;
}

export function LoginForm({ changeForm }: Props) {
  const { loginUser } = useAuth();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    loginUser(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6">
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
          <p>Don&apos;t have an account? </p>
          <p onClick={changeForm} className="text-primary cursor-pointer">
            Sing Up
          </p>
        </div>

        <Button className="mt-4" type="submit">
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
