
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
  Wallet,
  ShieldCheck,
  LogOut,
  ShoppingCart
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

const ngoMenuItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/verify', label: 'New Verification', icon: FilePlus2 },
  { path: '/dashboard/projects', label: 'Projects', icon: List },
  { path: '/dashboard/marketplace', label: 'Marketplace', icon: Store },
  { path: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
];

const buyerMenuItems = [
  { path: '/dashboard', label: 'Marketplace', icon: Store },
  { path: '/dashboard/purchases', label: 'My Purchases', icon: ShoppingCart },
];

const verifierMenuItems = [
  { path: '/dashboard', label: 'Pending Submissions', icon: ShieldCheck },
];


export default function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();

  let menuItems: { path: string, label: string, icon: React.ElementType }[] = [];
  let userProfile = { name: "Eco Ventures", type: "NGO" };

  switch (role) {
    case 'buyer':
      menuItems = buyerMenuItems;
      userProfile = { name: "Green Buyer Co.", type: "Buyer" };
      break;
    case 'verifier':
      menuItems = verifierMenuItems;
       userProfile = { name: "NCCR Verifier", type: "Verifier" };
      break;
    case 'ngo':
    default:
      menuItems = ngoMenuItems;
      userProfile = { name: "Eco Ventures", type: "NGO" };
      break;
  }
  
  // Always add settings for all roles
  menuItems.push({ path: '/dashboard/settings', label: 'Settings', icon: Settings });

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
                  isActive={pathname.startsWith(item.path) && (item.path !== '/dashboard' || pathname === '/dashboard')}
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
           <SidebarMenuItem>
              <Link href="/login" legacyBehavior passHref>
                <SidebarMenuButton className="justify-start text-muted-foreground hover:text-destructive">
                    <LogOut className="size-5" />
                    <span>Logout</span>
                </SidebarMenuButton>
              </Link>
           </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-2" />
        <div className="flex items-center gap-3 p-2">
            <Avatar>
              <AvatarImage src={`https://picsum.photos/seed/${userProfile.name}/40/40`} />
              <AvatarFallback>{userProfile.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-semibold">{userProfile.name}</span>
                <span className="text-muted-foreground">{userProfile.type}</span>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
