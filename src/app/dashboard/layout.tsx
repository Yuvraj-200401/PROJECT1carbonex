
'use client';
import { useEffect, useState } from 'react';
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
        <div className="flex flex-col min-h-screen w-full bg-background">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
                 <Skeleton className="h-8 w-36" />
                 <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="size-8 rounded-full" />
                 </div>
            </header>
            <main className="flex-1 p-4 md:p-8">
                 <Skeleton className="h-12 w-1/3 mb-8" />
                 <Skeleton className="h-64 w-full" />
            </main>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
        <DashboardHeader role={role} user={user} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
        </main>
    </div>
  );
}
