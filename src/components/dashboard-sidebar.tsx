
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FilePlus2,
  Store,
  Settings,
  CircleHelp,
  Wallet,
  ShieldCheck,
  LogOut,
  ShoppingCart,
  Boxes,
  FolderKanban,
} from 'lucide-react';

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

const ngoMenuItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { path: '/dashboard/verify', label: 'New Verification', icon: FilePlus2 },
  { path: '/dashboard/marketplace', label: 'Marketplace', icon: Store },
  { path: '/dashboard/my-tokens', label: 'My Tokens', icon: Boxes },
  { path: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const buyerMenuItems = [
  { path: '/dashboard', label: 'Marketplace', icon: Store },
  { path: '/dashboard/purchases', label: 'My Purchases', icon: ShoppingCart },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const verifierMenuItems = [
  { path: '/dashboard', label: 'Pending Submissions', icon: ShieldCheck },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];


export default function DashboardSidebar({ role, user }: { role: string; user: { name: string, image: string } | null }) {
  const pathname = usePathname();
  const router = useRouter();

  let menuItems: { path: string, label: string, icon: React.ElementType }[] = [];
  let userProfile = { name: "Demo User", type: "Role" };

  switch (role) {
    case 'buyer':
      menuItems = buyerMenuItems;
      userProfile = { name: user?.name || "Green Buyer Co.", type: "Buyer" };
      break;
    case 'verifier':
      menuItems = verifierMenuItems;
       userProfile = { name: user?.name || "NCCR Verifier", type: "Verifier" };
      break;
    case 'ngo':
    default:
      menuItems = ngoMenuItems;
      userProfile = { name: user?.name || "Eco Ventures", type: "NGO" };
      break;
  }
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    router.push('/login');
  };


  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <CarboNexLogo className="size-7 text-primary md:hidden" />
           <span className="text-lg font-bold font-headline tracking-tight md:hidden">
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
                  isActive={pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path))}
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
              <AvatarImage src={user?.image || `https://picsum.photos/seed/${userProfile.name}/40/40`} />
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
