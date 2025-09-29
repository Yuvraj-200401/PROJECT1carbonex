
'use client';

import { useState, useEffect } from 'react';
import { getProjects, updateProjectStatus, subscribe, Project } from '@/lib/demo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';

export default function VerifierDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    
    const refreshProjects = () => {
        setProjects(getProjects());
    };

    useEffect(() => {
        refreshProjects();
        const unsubscribe = subscribe(refreshProjects);
        return () => unsubscribe();
    }, []);

    const handleUpdateStatus = (id: string, status: 'Verified' | 'Action Required') => {
        updateProjectStatus(id, status);
        toast({
            title: "Project Updated",
            description: `Project has been marked as ${status}.`
        });
    }

    const pendingProjects = projects.filter(p => p.status === 'Pending');
    const approvedProjects = projects.filter(p => p.status === 'Verified');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Verification Submissions</h1>
                    <p className="text-muted-foreground">Review and approve pending carbon credit projects.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pending Projects</CardTitle>
                    <CardDescription>
                        {pendingProjects.length > 0 
                            ? `There are ${pendingProjects.length} projects awaiting your review.` 
                            : 'There are no pending projects at this time.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Site</TableHead>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Area (ha)</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingProjects.length > 0 ? (
                                pendingProjects.map(project => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.siteName}</TableCell>
                                        <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{project.area_ha}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleUpdateStatus(project.id, 'Action Required')}>Reject</Button>
                                            <Button size="sm" onClick={() => handleUpdateStatus(project.id, 'Verified')}>Approve</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        All caught up!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Approved Projects</CardTitle>
                    <CardDescription>
                        A record of all projects you have successfully verified.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Site</TableHead>
                                <TableHead>Date Approved</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {approvedProjects.length > 0 ? (
                                approvedProjects.map(project => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">{project.siteName}</TableCell>
                                        <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="default">{project.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                       No projects have been approved yet.
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
