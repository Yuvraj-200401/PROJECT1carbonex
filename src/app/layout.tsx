import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { I18nProviderClient } from '@/locales/client';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'CARBO-NEX',
  description: 'Blue Carbon Verification & Tokenization Platform',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  const effectiveLocale = locale || 'en';

  return (
    <html lang={effectiveLocale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <I18nProviderClient locale={effectiveLocale}>
          {children}
        </I18nProviderClient>
        <Toaster />
      </body>
    </html>
  );
}
