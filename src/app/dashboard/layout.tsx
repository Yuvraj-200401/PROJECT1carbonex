
'use client';
import { useEffect, useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard-sidebar';
import DashboardHeader from '@/components/dashboard-header';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<{name: string, image: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // We are in a client component, so we can safely access localStorage
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const userImage = localStorage.getItem('userImage');

    if (userRole && userName) {
        setRole(userRole);
        setUser({ name: userName, image: userImage || '' });
    } else {
        router.push('/login');
    }
    setLoading(false);
  }, [router]);

  if (loading || !role || !user) {
    return (
        <div className="flex min-h-screen w-full bg-background">
            <div className="hidden md:block w-64 p-4 space-y-2 border-r">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex-1 p-8">
                 <Skeleton className="h-12 w-1/3 mb-8" />
                 <Skeleton className="h-64 w-full" />
            </div>
        </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar>
          <DashboardSidebar role={role} user={user}/>
        </Sidebar>
        <SidebarInset>
          <div className="flex h-full flex-col">
            <DashboardHeader role={role} />
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
