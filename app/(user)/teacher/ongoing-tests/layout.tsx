import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ongoing test',
};

export default function OngoingTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
