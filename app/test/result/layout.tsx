import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Result',
};

export default function TestResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-full">{children}</main>;
}
