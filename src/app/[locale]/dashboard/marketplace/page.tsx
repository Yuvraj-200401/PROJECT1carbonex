
'use client';
import { useState, useEffect } from 'react';
import BuyerDashboard from '@/components/dashboards/buyer-dashboard';
import NGOMarketplace from '@/components/dashboards/ngo-marketplace';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export default function MarketplacePage() {
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
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-80" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    switch (role) {
        case 'NGO':
            return <NGOMarketplace />;
        case 'Buyer':
            return <BuyerDashboard />;
        default:
            return <div className="text-center">The marketplace is not available for your role.</div>;
    }
}
