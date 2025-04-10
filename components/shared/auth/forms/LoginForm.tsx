'use client';

import { useForm } from 'react-hook-form';
import { LoginData, loginFormSchema } from './schemas';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Props {
  changeForm: () => void;
}

export function LoginForm({ changeForm }: Props) {
  const { loginUser, isLoginPending } = useAuth();

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
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <Input placeholder="Email" {...field} type="email" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Password</Label>
                <Input placeholder="Password" {...field} type="password" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-1 font-roboto">
          <p>Don&apos;t have an account? </p>
          <p onClick={changeForm} className="text-primary cursor-pointer">
            Sing Up
          </p>
        </div>

        <Button className="mt-4" type="submit" disabled={isLoginPending}>
          Login
        </Button>
      </form>
    </Form>
  );
}
