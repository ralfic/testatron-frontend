'use client';

import { useForm } from 'react-hook-form';
import { RegisterData, registerSchema } from './schemas';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/user/useAuth';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/types';
import { PiChalkboardTeacherThin } from 'react-icons/pi';
import { PiStudentLight } from 'react-icons/pi';
import { cn } from '@/lib/utils';

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
      role: UserRole.STUDENT,
    },
  });

  const onSubmit = (data: RegisterData) => {
    registerUser(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
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
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <RolePickCard
                    role={UserRole.TEACHER}
                    onClick={() => field.onChange(UserRole.TEACHER)}
                    isSelected={field.value === UserRole.TEACHER}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <RolePickCard
                    role={UserRole.STUDENT}
                    onClick={() => field.onChange(UserRole.STUDENT)}
                    isSelected={field.value === UserRole.STUDENT}
                  />
                )}
              />
            </div>
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

function RolePickCard({
  role,
  onClick,
  isSelected,
}: {
  role: UserRole;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      className={cn(
        'flex flex-row items-center bg-card justify-center rounded-lg border py-2.5 px-2 gap-2 w-full cursor-pointer hover:bg-muted transition-colors',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': isSelected,
        }
      )}
      onClick={onClick}
    >
      {role === UserRole.TEACHER ? (
        <>
          <PiChalkboardTeacherThin size={30} />
          <p>Teacher</p>
        </>
      ) : (
        <>
          <PiStudentLight size={30} />
          <p>Student</p>
        </>
      )}
    </div>
  );
}
