
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
import { usePathname } from 'next/navigation';

const locales = ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu', 'kn', 'ml', 'or'] as const;

const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
]

export function MainHeader() {
  const t = useI18n();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const pathname = usePathname();

  if (pathname.includes('/dashboard')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CarboNexLogo className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-foreground">
            CARBO-NEX
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6">
            {navLinks.map(link => (
                 <Button key={link.href} variant="ghost" asChild>
                    <Link href={link.href}>{link.label}</Link>
                </Button>
            ))}
        </nav>
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/login">
              Sign Up <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((locale) => (
                <DropdownMenuItem
                  key={locale}
                  onClick={() => changeLocale(locale)}
                  className={currentLocale === locale ? 'font-bold' : ''}
                >
                  {t(`lang.${locale}`)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

    