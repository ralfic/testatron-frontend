'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { LoginData, loginFormSchema } from './schemas';
import { InputForm } from '@/components/shared/form/input-form';
import { Button } from '@/components/ui/button';
import { KeyRound, Mail } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/auth-hooks/use-login';

interface Props {
  changeForm: () => void;
}

export function LoginForm({ changeForm }: Props) {
  const { mutate: login } = useLogin();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    login(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-8">
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
            <p>Don&apos;t have an account? </p>
            <p onClick={changeForm} className="text-primary cursor-pointer">
              Sing Up
            </p>
          </div>
        </div>

        <Button className="mt-6" type="submit">
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
