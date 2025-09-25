// src/components/main-header.tsx
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CarboNexLogo } from '@/components/icons';
import { ArrowRight, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n, useChangeLocale, useCurrentLocale } from '@/locales/client';

export function MainHeader() {
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CarboNexLogo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block text-foreground">
              CARBO-NEX
            </span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
             <Button variant="ghost" asChild>
                <Link href="/login">{t('header.explore')}</Link>
             </Button>
             <Link href="/login">
                <Button>
                  {t('header.launch')} <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Globe className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLocale('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLocale('hi')}>
                  Hindi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
  )
}
