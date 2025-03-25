import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ended test',
};

export default function EndedTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
