
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProjects, subscribe, Project } from '@/lib/demo-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { IndianRupee, DollarSign } from 'lucide-react';

const TOKEN_PRICE_USD = 25;
const USD_TO_INR_RATE = 83.5; // Approximate rate

function BuyerWallet() {
    const [purchasedProjects, setPurchasedProjects] = useState<Project[]>([]);
    
    useEffect(() => {
        const refreshProjects = () => {
            const allProjects = getProjects();
            setPurchasedProjects(allProjects.filter(p => p.ownerId === 'Buyer' && p.status === 'Purchased'));
        }
        refreshProjects();
        const unsubscribe = subscribe(refreshProjects);
        return () => unsubscribe();
    }, []);

    const totalTokens = purchasedProjects.reduce((sum, p) => sum + (p.prediction?.oneYearPrediction || 0), 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">My Purchases</h1>
                    <p className="text-muted-foreground">A record of all your acquired carbon credit tokens.</p>
                </div>
                 <Card className="p-4 bg-card">
                    <p className="text-sm text-muted-foreground">Total Owned Tokens</p>
                    <p className="text-2xl font-bold text-primary">{totalTokens.toLocaleString()}</p>
                </Card>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle>Purchased Token Portfolio</CardTitle>
                    <CardDescription>
                       These are the carbon credit projects you have invested in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Tokens Acquired</TableHead>
                                <TableHead>Purchase Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {purchasedProjects.length > 0 ? (
                                purchasedProjects.map(project => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.siteName}</TableCell>
                                        <TableCell>{project.prediction?.oneYearPrediction.toLocaleString() || 0}</TableCell>
                                        <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="default">
                                                {project.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                             ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                       You have not purchased any tokens yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function NGOWallet() {
    const [soldProjects, setSoldProjects] = useState<Project[]>([]);
    
    useEffect(() => {
        const refreshProjects = () => {
            const allProjects = getProjects();
            setSoldProjects(allProjects.filter(p => p.status === 'Purchased'));
        }
        refreshProjects();
        const unsubscribe = subscribe(refreshProjects);
        return () => unsubscribe();
    }, []);

    const totalTokensSold = soldProjects.reduce((sum, p) => sum + (p.prediction?.oneYearPrediction || 0), 0);
    const totalUsd = totalTokensSold * TOKEN_PRICE_USD;
    const totalInr = totalUsd * USD_TO_INR_RATE;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
             <div>
                <h1 className="text-3xl font-bold font-headline">My Wallet</h1>
                <p className="text-muted-foreground">Summary of funds received from token sales.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign /> Total Revenue (USD)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-muted-foreground">
                           <IndianRupee /> Total Revenue (INR)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">₹{totalInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                       A list of all completed token sales from your projects.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Sold</TableHead>
                                <TableHead>Tokens Sold</TableHead>
                                <TableHead>Value (USD)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {soldProjects.length > 0 ? (
                                soldProjects.map(project => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.siteName}</TableCell>
                                        <TableCell>{project.prediction?.oneYearPrediction.toLocaleString() || 0}</TableCell>
                                        <TableCell>${((project.prediction?.oneYearPrediction || 0) * TOKEN_PRICE_USD).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                             ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                       No tokens have been sold yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </motion.div>
    );
}

export default function WalletPage() {
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
            <div className="grid gap-6 md:grid-cols-2">
                 <Skeleton className="h-28 w-full" />
                 <Skeleton className="h-28 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }

  switch (role) {
    case 'NGO':
      return <NGOWallet />;
    case 'Buyer':
      return <BuyerWallet />;
    default:
        return <div className="text-center">This page is not available for your role.</div>;
  }
}
