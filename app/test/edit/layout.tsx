import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit test',
};

export default function EditTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
