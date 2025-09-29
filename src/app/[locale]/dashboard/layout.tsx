'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { APIProvider } from '@vis.gl/react-google-maps';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('demoUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error("Could not access local storage:", error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen w-full bg-background">
        <div className="hidden md:flex md:w-64 flex-col border-r bg-sidebar-gradient p-4">
          <div className="mb-8 flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b px-4 md:px-8">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8">
            <Skeleton className="h-96 w-full" />
          </main>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <DashboardSidebar user={user} role={user.role} />
          <div className="flex flex-1 flex-col">
            <DashboardHeader user={user} role={user.role} />
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </APIProvider>
  );
}
