
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWeb3 } from '@/lib/web3-mock';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { wallet, loading } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !wallet) {
      router.push('/login');
    }
  }, [wallet, loading, router]);

  if (loading || !wallet) {
    return (
        <div className="flex flex-col min-h-screen w-full bg-background p-8">
            <header className="flex items-center justify-between mb-8">
                 <Skeleton className="h-8 w-48" />
                 <Skeleton className="h-10 w-40 rounded-full" />
            </header>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-64 w-full md:col-span-2" />
                <Skeleton className="h-64 w-full" />
            </main>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
        {children}
    </div>
  );
}
