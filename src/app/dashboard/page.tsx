
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NGOOverview from '@/components/dashboards/ngo-overview';
import VerifierDashboard from '@/components/dashboards/verifier-dashboard';
import BuyerDashboard from '@/components/dashboards/buyer-dashboard';

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
    return <div className="flex items-center justify-center h-full">Loading dashboard...</div>;
  }

  switch (role) {
    case 'NGO':
      return <NGOOverview />;
    case 'Verifier':
      return <VerifierDashboard />;
    case 'Buyer':
      return <BuyerDashboard />;
    case 'Community':
        // For now, community can see the buyer dashboard
        return <BuyerDashboard />;
    default:
        // Fallback or a generic dashboard
        return <div>Welcome to your dashboard.</div>;
  }
}
