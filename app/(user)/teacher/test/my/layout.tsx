import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My tests',
};

export default function MyTestsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
