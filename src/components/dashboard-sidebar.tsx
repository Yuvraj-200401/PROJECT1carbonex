
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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

interface DashboardSidebarProps {
  user: { name: string; email: string };
  role: string;
}

const menuItemsByRole: Record<string, any[]> = {
    NGO: [
        { href: '/dashboard', icon: <LayoutGrid />, label: 'Overview' },
        { href: '/dashboard/projects', icon: <Briefcase />, label: 'Projects' },
        { href: '/dashboard/verify', icon: <FilePlus />, label: 'New Verification' },
        { href: '/dashboard/my-tokens', icon: <Coins />, label: 'My Tokens' },
        { href: '/dashboard/marketplace', icon: <ShoppingCart />, label: 'Marketplace' },
        { href: '/dashboard/wallet', icon: <Wallet />, label: 'Wallet' },
    ],
    Verifier: [
        { href: '/dashboard', icon: <LayoutGrid />, label: 'Submissions' },
    ],
    Buyer: [
        { href: '/dashboard', icon: <LayoutGrid />, label: 'Overview' },
        { href: '/dashboard/marketplace', icon: <ShoppingCart />, label: 'Marketplace' },
        { href: '/dashboard/wallet', icon: <Wallet />, label: 'My Purchases' },
    ],
};

const bottomMenuItems = [
    { href: '/dashboard/settings', icon: <Settings />, label: 'Settings' },
    { href: '/dashboard/support', icon: <HelpCircle />, label: 'Help & Support' },
];

export function DashboardSidebar({ user, role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { open, setOpen, isMobile } = useSidebar();

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
                        active={pathname === item.href}
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
                        active={pathname === item.href}
                        onClick={() => isMobile && setOpen(false)}
                    >
                        {item.label}
                    </SidebarItem>
                ))}
                 <SidebarItem
                    icon={<LogOut />}
                    onClick={handleLogout}
                >
                    Logout
                </SidebarItem>
            </SidebarSection>
        </SidebarBody>
    </Sidebar>
  );
}
