import Header from '@/components/shared/header/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function LendingLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      {modal}
    </div>
  );
}
