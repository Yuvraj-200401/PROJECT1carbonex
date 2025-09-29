
'use client';
import { useState, useEffect } from 'react';
import { getProjects, updateProjectStatus, subscribe, Project } from '@/lib/demo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, DollarSign, LineChart as LineChartIcon, Newspaper } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TOKEN_PRICE_USD = 25;

const marketStats = {
    avgPrice: 24.85,
    volume24h: 1250000,
    floorPrice: 22.50,
};

const priceHistory = [
    { date: '7d ago', price: 23.50 },
    { date: '6d ago', price: 24.00 },
    { date: '5d ago', price: 24.20 },
    { date: '4d ago', price: 23.90 },
    { date: '3d ago', price: 24.50 },
    { date: '2d ago', price: 25.10 },
    { date: 'Today', price: 24.85 },
];

const recentActivity = [
    { id: 1, buyer: 'EcoCapital Inc.', project: 'Bhitarkanika Mangroves', tokens: 500 },
    { id: 2, buyer: 'Green Future Fund', project: 'Pichavaram Restoration', tokens: 1200 },
    { id: 3, buyer: 'Terra Global', project: 'Krishna-Godavari Delta', tokens: 800 },
];

const StatCard = ({ title, value, icon, change }: { title: string; value: string; icon: React.ReactNode; change?: number }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {change && (
                <p className={`text-xs ${change > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {change > 0 ? <ArrowUp className="mr-1" /> : <ArrowDown className="mr-1" />}
                    {change.toFixed(2)}% vs yesterday
                </p>
            )}
        </CardContent>
    </Card>
);

export default function NGOMarketplace() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const refreshProjects = () => setProjects(getProjects());
        refreshProjects();
        const unsubscribe = subscribe(refreshProjects);
        return () => unsubscribe();
    }, []);

    const handleUnlist = (id: string) => {
        updateProjectStatus(id, 'Minted');
        toast({
            title: 'Project Unlisted',
            description: 'Your tokens have been removed from the marketplace.',
        });
    };

    const listedProjects = projects.filter(p => p.status === 'Listed' && p.ownerId === 'NGO');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-3xl font-bold font-headline">Marketplace Intelligence</h1>
                <p className="text-muted-foreground">Monitor market trends and manage your token listings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Average Token Price" value={`$${marketStats.avgPrice.toFixed(2)}`} icon={<DollarSign />} change={1.5} />
                <StatCard title="24h Trading Volume" value={`$${(marketStats.volume24h / 1000000).toFixed(2)}M`} icon={<Newspaper />} change={-5.2} />
                <StatCard title="Floor Price" value={`$${marketStats.floorPrice.toFixed(2)}`} icon={<DollarSign />} change={0.8}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>My Active Listings</CardTitle>
                        <CardDescription>Manage your projects currently for sale on the marketplace.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Tokens for Sale</TableHead>
                                    <TableHead>Total Value</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {listedProjects.length > 0 ? (
                                    listedProjects.map(p => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-medium">{p.siteName}</TableCell>
                                            <TableCell>{p.prediction?.oneYearPrediction.toLocaleString() || 0}</TableCell>
                                            <TableCell>${((p.prediction?.oneYearPrediction || 0) * TOKEN_PRICE_USD).toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="destructive" onClick={() => handleUnlist(p.id)}>Unlist</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">You have no active listings.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LineChartIcon/>CARBO Price History (7d)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={priceHistory}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="date" tick={{fontSize: 12}}/>
                                <YAxis domain={['dataMin - 1', 'dataMax + 1']} tickFormatter={(value) => `$${value}`}/>
                                <Tooltip contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Price"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Market Activity</CardTitle>
                    <CardDescription>A feed of the latest sales across the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Buyer</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Tokens Purchased</TableHead>
                                <TableHead>Total Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {recentActivity.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.buyer}</TableCell>
                                    <TableCell>{item.project}</TableCell>
                                    <TableCell>{item.tokens.toLocaleString()}</TableCell>
                                    <TableCell>${(item.tokens * marketStats.avgPrice).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </motion.div>
    );
}

