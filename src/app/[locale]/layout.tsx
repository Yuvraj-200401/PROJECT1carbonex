import type {Metadata} from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { OceanGuardian } from '@/components/ocean-guardian';
import { I18nProviderClient } from '@/locales/client';
import { MainHeader } from '@/components/main-header';

export const metadata: Metadata = {
  title: 'CARBO-NEX',
  description: 'Blue Carbon Verification & Tokenization Platform',
};

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <I18nProviderClient locale={locale}>
      <html lang={locale} className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        </head>
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
