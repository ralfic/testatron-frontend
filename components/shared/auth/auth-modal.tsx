'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from 'react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: Props) {
  const [type, setType] = useState<'signup' | 'login'>('login');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <VisuallyHidden>
        <DialogTitle>Modal</DialogTitle>
      </VisuallyHidden>
      <DialogContent className="sm:max-w-[425px] p-8">
        <h2 className="text-3xl text-center  font-inter mb-6">
          {type === 'login' ? 'Login' : 'Sign up'}
        </h2>

        {type === 'login' ? (
          <LoginForm changeForm={() => setType('signup')} />
        ) : (
          <RegisterForm changeForm={() => setType('login')} />
        )}
      </DialogContent>
    </Dialog>
  );
}
