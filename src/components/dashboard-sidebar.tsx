
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  useSidebar,
} from '@/components/ui/sidebar';
import { CarboNexLogo } from './icons';
import {
  LayoutGrid,
  FilePlus,
  ShoppingCart,
  Coins,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Briefcase,
} from 'lucide-react';
import { Button } from './ui/button';
import { useI18n } from '@/locales/client';

interface DashboardSidebarProps {
  user: { name: string; email: string };
  role: string;
}


export function DashboardSidebar({ user, role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { open, setOpen, isMobile } = useSidebar();
  const t = useI18n();

  const menuItemsByRole: Record<string, any[]> = {
    NGO: [
        { href: '/dashboard', icon: <LayoutGrid />, label: t('dashboard.sidebar.overview') },
        { href: '/dashboard/projects', icon: <Briefcase />, label: t('dashboard.sidebar.projects') },
        { href: '/dashboard/verify', icon: <FilePlus />, label: t('dashboard.sidebar.new_verification') },
        { href: '/dashboard/my-tokens', icon: <Coins />, label: t('dashboard.sidebar.my_tokens') },
        { href: '/dashboard/marketplace', icon: <ShoppingCart />, label: t('dashboard.sidebar.marketplace') },
        { href: '/dashboard/wallet', icon: <Wallet />, label: t('dashboard.sidebar.wallet') },
    ],
    Verifier: [
        { href: '/dashboard', icon: <LayoutGrid />, label: t('dashboard.sidebar.submissions') },
    ],
    Buyer: [
        { href: '/dashboard', icon: <LayoutGrid />, label: t('dashboard.sidebar.overview') },
        { href: '/dashboard/marketplace', icon: <ShoppingCart />, label: t('dashboard.sidebar.marketplace') },
        { href: '/dashboard/wallet', icon: <Wallet />, label: t('dashboard.sidebar.my_purchases') },
    ],
  };

  const bottomMenuItems = [
      { href: '/dashboard/settings', icon: <Settings />, label: t('dashboard.sidebar.settings') },
      { href: '/dashboard/support', icon: <HelpCircle />, label: t('dashboard.sidebar.support') },
  ];


  const handleLogout = () => {
    try {
      localStorage.removeItem('demoUser');
    } catch (error) {
      console.error("Could not access local storage:", error);
    }
    router.push('/login');
  };

  const menuItems = menuItemsByRole[role] || [];

  return (
    <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <CarboNexLogo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline text-foreground">
                    CARBO-NEX
                </span>
            </div>
             <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setOpen(false)}
            >
                <ChevronLeft />
            </Button>
        </SidebarHeader>
        <SidebarBody>
            <SidebarSection>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        active={pathname.endsWith(item.href)}
                        onClick={() => isMobile && setOpen(false)}
                    >
                        {item.label}
                    </SidebarItem>
                ))}
            </SidebarSection>
            <SidebarSection className="mt-auto">
                {bottomMenuItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        active={pathname.endsWith(item.href)}
                        onClick={() => isMobile && setOpen(false)}
                    >
                        {item.label}
                    </SidebarItem>
                ))}
                 <SidebarItem
                    icon={<LogOut />}
                    onClick={handleLogout}
                >
                    {t('dashboard.sidebar.logout')}
                </SidebarItem>
            </SidebarSection>
        </SidebarBody>
    </Sidebar>
  );
}
