import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/shared/Providers';
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
