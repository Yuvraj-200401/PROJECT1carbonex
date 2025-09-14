
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NGOOverview from '@/components/dashboards/ngo-overview';
import VerifierDashboard from '@/components/dashboards/verifier-dashboard';
import BuyerDashboard from '@/components/dashboards/buyer-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardRootPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('demoUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setRole(user.role);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error("Could not access local storage, redirecting to login.");
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-80" />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Skeleton className="h-96 lg:col-span-3" />
                <div className="lg:col-span-2 space-y-6">
                     <Skeleton className="h-48 w-full" />
                     <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    );
  }

  switch (role) {
    case 'NGO':
      return <NGOOverview />;
    case 'Verifier':
      return <VerifierDashboard />;
    case 'Buyer':
      return <BuyerDashboard />;
    default:
        return <div className="text-center">Unsupported role. Please log in again.</div>;
  }
}
