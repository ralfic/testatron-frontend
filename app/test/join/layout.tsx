import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join test',
};

export default function EditTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className='h-full '>{children}</main>;
}
