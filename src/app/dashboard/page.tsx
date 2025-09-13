
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import NGOOverview from '@/components/dashboards/ngo-overview';
import BuyerMarketplace from '@/components/dashboards/buyer-marketplace';
import VerifierDashboard from '@/components/dashboards/verifier-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardRootPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
        setRole(userRole);
    } else {
        router.push('/login'); // If somehow role is missing, redirect to login
    }
    setLoading(false);
  }, [router]);

  const renderDashboard = () => {
    if (loading) {
       return (
          <div className="space-y-8">
            <Skeleton className="h-10 w-1/2" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Skeleton className="lg:col-span-2 h-96 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        );
    }

    switch (role) {
      case 'ngo':
        return <NGOOverview />;
      case 'buyer':
        return <BuyerMarketplace />;
      case 'verifier':
        return <VerifierDashboard />;
      default:
        // This will be shown briefly while redirecting if role is not set
        return (
          <div className="space-y-8">
            <Skeleton className="h-10 w-1/2" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Skeleton className="lg:col-span-2 h-96 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        );
    }
  };

  return <div className="animate-fade-in-up">{renderDashboard()}</div>;
}
