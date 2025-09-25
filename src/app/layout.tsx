// This is the root layout for all pages that don't match the [locale] layout.
// It does not have i18n capabilities.
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { OceanGuardian } from '@/components/ocean-guardian';

export const metadata: Metadata = {
  title: 'CARBO-NEX',
  description: 'Blue Carbon Verification & Tokenization Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          {children}
        <Toaster />
        <OceanGuardian />
      </body>
    </html>
  );
}
