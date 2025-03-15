import Header from '@/components/shared/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testatron | Home',
};

export default function HomeLayout({
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
