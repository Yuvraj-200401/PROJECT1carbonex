
'use client';
import { useState, useEffect } from 'react';
import { getProjects, updateProjectStatus, subscribe, Project } from '@/lib/demo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function MyTokensPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    const refreshProjects = () => {
        setProjects(getProjects());
    }

    useEffect(() => {
        refreshProjects();
        const unsubscribe = subscribe(refreshProjects);
        return () => unsubscribe();
    }, []);

    const handleListForSale = (id: string) => {
        updateProjectStatus(id, 'Listed');
        toast({
            title: 'Tokens Listed!',
            description: 'Your carbon credit tokens are now available on the marketplace.',
        });
    };

    const tokenProjects = projects.filter(p => p.status === 'Minted' || p.status === 'Listed');
    const totalTokens = tokenProjects.reduce((sum, p) => sum + (p.prediction?.oneYearPrediction || 0), 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">My Tokens</h1>
                    <p className="text-muted-foreground">Manage and list your minted CARBO tokens.</p>
                </div>
                <Card className="p-4 bg-card">
                    <p className="text-sm text-muted-foreground">Total Owned Tokens</p>
                    <p className="text-2xl font-bold text-primary">{totalTokens.toLocaleString()}</p>
                </Card>
            </div>

            <Card>
                 <CardHeader>
                    <CardTitle>Tokenized Projects</CardTitle>
                    <CardDescription>
                       These projects have had their carbon credits minted into tokens. You can list them for sale on the marketplace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Tokens Minted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tokenProjects.length > 0 ? (
                                tokenProjects.map(project => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.siteName}</TableCell>
                                        <TableCell>{project.prediction?.oneYearPrediction.toLocaleString() || 0}</TableCell>
                                        <TableCell>
                                            <Badge variant={project.status === 'Listed' ? 'default' : 'secondary'}>
                                                {project.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                onClick={() => handleListForSale(project.id)}
                                                disabled={project.status === 'Listed'}
                                            >
                                                {project.status === 'Listed' ? 'Listed' : 'List for Sale'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                             ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                       You have not minted any tokens yet.
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
