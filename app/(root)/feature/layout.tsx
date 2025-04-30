import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feature',
};

export default function FeatureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
