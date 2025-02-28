'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { AuthModal } from './auth/auth-modal';
import Container from './container';
import Logo from './logo';
import NavigationMenu from './navigation-menu';

export default function Header() {
  const [isOpen, onClose] = useState(false);

  return (
    <header className="pt-8 mb-28">
      <Container className="grid grid-cols-3 items-center ">
        <Logo />
        <NavigationMenu />
        <div className="flex items-center">
          <Button className="ml-auto" onClick={() => onClose((prev) => !prev)}>
            Login
          </Button>
          <AuthModal isOpen={isOpen} onClose={() => onClose(false)} />
        </div>
      </Container>
    </header>
  );
}
