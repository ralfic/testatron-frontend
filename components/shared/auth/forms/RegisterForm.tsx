'use client';

import { useForm } from 'react-hook-form';
import { RegisterData, registerSchema } from './schemas';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Props {
  changeForm: () => void;
}

export function RegisterForm({ changeForm }: Props) {
  const { registerUser, isRegisterPending } = useAuth();

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            <FormField
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <Label>Full name</Label>
                  <Input placeholder="Full name" {...field} type="text" />
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <p>Already have an account?</p>
            <p className="text-primary cursor-pointer" onClick={changeForm}>
              Login
            </p>
          </div>

          <Button className="mt-4" type="submit" disabled={isRegisterPending}>
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
}
