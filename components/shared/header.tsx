'use client';

import { useState } from 'react';
import { AuthModal } from './auth/AuthModal';
import NavigationMenu from './NavigationMenu';
import { ButtonAuth } from './ButtonAuth';
import { Logo } from './Logo';
import { Container } from './Container';

export default function Header() {
  const [isOpen, onClose] = useState(false);

  return (
    <header className="pt-8 mb-10">
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
