
'use client';

import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CarboNexLogo } from './icons';
import {
  Bell,
  ChevronDown,
  Coins,
  Menu,
  PlusCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import { useSidebar } from './ui/sidebar';

interface DashboardHeaderProps {
  user: { name: string; email: string };
  role: string;
}

export function DashboardHeader({ user, role }: DashboardHeaderProps) {
  const { toggle } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem('demoUser');
    } catch (error) {
      console.error("Could not access local storage:", error);
    }
    router.push('/login');
  };
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="md:hidden rounded-md p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
        <div className="hidden md:flex items-center gap-2">
            <CarboNexLogo className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline text-foreground">
                CARBO-NEX
            </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {role === 'NGO' && (
          <Button
            size="sm"
            className="hidden sm:flex"
            onClick={() => router.push('/dashboard/verify')}
          >
            <PlusCircle />
            New Verification
          </Button>
        )}
        
        <Button size="sm" variant="outline" className="hidden sm:flex items-center gap-2">
            <span className="text-primary"><Coins/></span>
            <span className='font-bold'>1,800 CARBO</span>
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name}/>
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{role}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                <Settings className='mr-2'/>
                Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
                <LogOut className='mr-2'/>
                Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
