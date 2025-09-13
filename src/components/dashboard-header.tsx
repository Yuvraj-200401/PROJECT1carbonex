'use client';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, PlusCircle, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHeader() {
  const pathname = usePathname();
  const pageTitle =
    pathname.split('/').pop()?.replace('-', ' ') ?? 'Dashboard';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-semibold capitalize font-headline">
          {pageTitle === 'dashboard' ? 'Overview' : pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/dashboard/verify">
        <Button size="sm" variant="outline">
            <PlusCircle className="mr-2 size-4" />
            New Project
        </Button>
        </Link>
        <Link href="/dashboard/wallet">
        <Button size="sm">
            <Wallet className="mr-2 size-4" />
            1,800 CARBO
        </Button>
        </Link>
        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
        </Button>
      </div>
    </header>
  );
}
