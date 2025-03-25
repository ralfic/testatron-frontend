'use client';

import { useAuth } from '@/hooks/useAuth';
import { ChangeFormAccount } from '../change-forms/ChangeFormAccount';
import { ChangeFormPassword } from '../change-forms/ChangeFormPassword';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function AccountSettings() {
  const { logoutUser } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <ChangeFormAccount />
      <ChangeFormPassword />

      <div>
        <p className="text-2xl font-semibold">Logout</p>
        <Button className="ml-2 mt-4" onClick={() => logoutUser()}>
          Logout <LogOut />
        </Button>
      </div>
    </div>
  );
}
