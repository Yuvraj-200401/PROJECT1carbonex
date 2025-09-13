'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FilePlus2,
  List,
  Store,
  Settings,
  CircleHelp,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { CarboNexLogo } from './icons';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

const menuItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/verify', label: 'New Verification', icon: FilePlus2 },
  { path: '/dashboard/projects', label: 'Projects', icon: List },
  { path: '/dashboard/marketplace', label: 'Marketplace', icon: Store },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <CarboNexLogo className="size-7 text-primary" />
          <span className="text-lg font-bold font-headline tracking-tight">
            CARBO-NEX
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <Link href={item.path} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.path}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="size-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <Separator className="my-2" />
        <SidebarMenu>
           <SidebarMenuItem>
              <SidebarMenuButton className="justify-start text-muted-foreground hover:text-foreground">
                <CircleHelp className="size-5" />
                <span>Help & Support</span>
              </SidebarMenuButton>
           </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-2" />
        <div className="flex items-center gap-3 p-2">
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-semibold">Eco Ventures</span>
                <span className="text-muted-foreground">NGO</span>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
