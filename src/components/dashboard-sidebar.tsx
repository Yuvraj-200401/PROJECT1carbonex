
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
import { auth } from '@/lib/firebase';
import { signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

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


export default function DashboardSidebar({ role, user }: { role: string; user: User | null }) {
  const pathname = usePathname();
  const router = useRouter();

  let menuItems: { path: string, label: string, icon: React.ElementType }[] = [];
  let userProfile = { name: "Eco Ventures", type: "NGO" };

  switch (role) {
    case 'buyer':
      menuItems = buyerMenuItems;
      userProfile = { name: user?.displayName || "Green Buyer Co.", type: "Buyer" };
      break;
    case 'verifier':
      menuItems = verifierMenuItems;
       userProfile = { name: user?.displayName || "NCCR Verifier", type: "Verifier" };
      break;
    case 'ngo':
    default:
      menuItems = ngoMenuItems;
      userProfile = { name: user?.displayName || "Eco Ventures", type: "NGO" };
      break;
  }
  
  // Always add settings for all roles
  menuItems.push({ path: '/dashboard/settings', label: 'Settings', icon: Settings });

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    router.push('/login');
  };


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
              <SidebarMenuButton onClick={handleLogout} className="justify-start text-muted-foreground hover:text-destructive">
                  <LogOut className="size-5" />
                  <span>Logout</span>
              </SidebarMenuButton>
           </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-2" />
        <div className="flex items-center gap-3 p-2">
            <Avatar>
              <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/${userProfile.name}/40/40`} />
              <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
