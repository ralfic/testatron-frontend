'use client';

import { useState } from 'react';
import { AuthModal } from './auth/auth-modal';
import Container from './container';
import Logo from './logo';
import NavigationMenu from './navigation-menu';
import { ButtonAuth } from './button-auth';

export default function Header() {
  const [isOpen, onClose] = useState(false);

  return (
    <header className="pt-8 mb-28">
      <Container className="grid grid-cols-3 items-center ">
        <Logo />
        <NavigationMenu />
        <div className="flex items-center">
          <ButtonAuth onClose={() => onClose((prev) => !prev)} />
          <AuthModal isOpen={isOpen} onClose={() => onClose(false)} />
        </div>
      </Container>
    </header>
  );
}
