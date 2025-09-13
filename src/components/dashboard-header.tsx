
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
  Menu,
  PlusCircle
} from 'lucide-react';
import { CarboNexLogo } from './icons';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils';


const ngoMenuItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { path: '/dashboard/verify', label: 'New Verification', icon: FilePlus2 },
  { path: '/dashboard/marketplace', label: 'Marketplace', icon: Store },
  { path: '/dashboard/my-tokens', label: 'My Tokens', icon: Boxes },
  { path: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
];

const buyerMenuItems = [
  { path: '/dashboard', label: 'Marketplace', icon: Store },
  { path: '/dashboard/purchases', label: 'My Purchases', icon: ShoppingCart },
];

const verifierMenuItems = [
  { path: '/dashboard', label: 'Pending Submissions', icon: ShieldCheck },
];

const settingsPath = '/dashboard/settings';

export default function DashboardHeader({ role, user }: { role: string; user: { name: string, image: string } | null }) {
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

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
     <Link
        href={href}
        className={cn(
            "transition-colors hover:text-foreground",
            pathname === href ? "text-foreground" : "text-muted-foreground"
        )}
        >
        {children}
    </Link>
  )


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                    <CarboNexLogo className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">CARBO-NEX</span>
                </Link>
                 {[...menuItems, { path: settingsPath, label: 'Settings', icon: Settings }].map((item) => (
                    <Link
                        key={item.label}
                        href={item.path}
                        className={cn("flex items-center gap-4 px-2.5",
                            pathname === item.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
                </nav>
            </SheetContent>
        </Sheet>

      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <CarboNexLogo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              CARBO-NEX
            </span>
        </Link>
        <nav className="hidden flex-col gap-6 text-sm font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {menuItems.map(item => <NavLink key={item.label} href={item.path}>{item.label}</NavLink>)}
        </nav>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
         {role === 'ngo' && (
          <div className='flex items-center gap-2'>
            <Link href="/dashboard/verify">
              <Button size="sm" variant="outline" className='hidden sm:flex'>
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
          </div>
        )}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
                >
                    <Avatar>
                        <AvatarImage src={user?.image || `https://picsum.photos/seed/${userProfile.name}/40/40`} />
                        <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account ({userProfile.type})</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="#">Support</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
