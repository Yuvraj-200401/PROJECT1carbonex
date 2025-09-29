
'use client';
import { useState, useEffect } from 'react';
import { getProjects, subscribe, Project } from '@/lib/demo-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function MyPurchasesPage() {
    const [purchasedProjects, setPurchasedProjects] = useState<Project[]>([]);
    
    useEffect(() => {
        const refreshProjects = () => {
            const allProjects = getProjects();
            // For this demo, 'Buyer' is the hardcoded ownerId after purchase
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
