import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { OceanGuardian } from '@/components/ocean-guardian';
import { MainHeader } from '@/components/main-header';
import { I18nProviderClient } from '@/locales/client';
import React from 'react';

import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'CARBO-NEX',
  description: 'Blue Carbon Verification & Tokenization Platform',
};

export default function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params; // ✅ FIXED

  return (
    <I18nProviderClient locale={locale}>
      <html
        lang={locale}
        className={`${inter.variable} ${spaceGrotesk.variable} dark`}
      >
        <body className="font-body antialiased">
          <MainHeader />
          {children}
          <Toaster />
          <OceanGuardian />
        </body>
      </html>
    </I18nProviderClient>
  );
}