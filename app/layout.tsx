import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/shared/Providers';

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Testatron',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
