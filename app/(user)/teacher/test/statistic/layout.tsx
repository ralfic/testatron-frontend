import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Statistic',
};

export default function TestStatisticLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
