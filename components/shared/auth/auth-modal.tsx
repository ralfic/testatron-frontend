'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: Props) {
  const [type, setType] = useState<'signup' | 'login'>('login');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8">
        <h2 className="text-3xl text-center  font-inter">
          {type === 'login' ? 'Login' : 'Sign up'}
        </h2>
      </DialogContent>
    </Dialog>
  );
}
