import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Passed tests',
};

export default function PassedTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
