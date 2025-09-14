
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProjects, Project, subscribe } from '@/lib/demo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, List } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const refreshProjects = () => setProjects(getProjects());
        refreshProjects(); // Initial fetch
        const unsubscribe = subscribe(refreshProjects); // Subscribe to changes
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const statusStyles: { [key: string]: string } = {
        'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Verified': 'bg-green-500/20 text-green-400 border-green-500/30',
        'Action Required': 'bg-red-500/20 text-red-400 border-red-500/30',
        'Minted': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'Listed': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">My Projects</h1>
                    <p className="text-muted-foreground">Track the status of all your carbon credit projects.</p>
                </div>
                <Button onClick={() => router.push('/dashboard/verify')}>
                    <PlusCircle className="mr-2" />
                    New Verification
                </Button>
            </div>

            {projects.length === 0 ? (
                 <Card className="text-center p-12 flex flex-col items-center">
                    <List size={48} className="text-muted-foreground mb-4" />
                    <CardTitle>No Projects Found</CardTitle>
                    <CardDescription className="mt-2 mb-6">Get started by submitting your first project for verification.</CardDescription>
                    <Button onClick={() => router.push('/dashboard/verify')}>
                        <PlusCircle className="mr-2" />
                        Submit a Project
                    </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Card 
                                className="overflow-hidden h-full flex flex-col cursor-pointer hover:border-primary transition-all"
                                onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                            >
                                <CardHeader className="p-0">
                                    <Image
                                        src={project.imageUrl || "https://picsum.photos/seed/project-img/400/250"}
                                        alt={project.siteName}
                                        width={400}
                                        height={250}
                                        className="w-full h-40 object-cover"
                                    />
                                </CardHeader>
                                <CardContent className="p-4 flex flex-col flex-grow">
                                    <Badge className={`w-fit ${statusStyles[project.status]}`}>{project.status}</Badge>
                                    <h3 className="text-lg font-semibold mt-2">{project.siteName}</h3>
                                    <p className="text-sm text-muted-foreground flex-grow">
                                        Submitted on: {new Date(project.date).toLocaleDateString()}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <p className="text-sm font-semibold">
                                            {project.prediction?.oneYearPrediction?.toLocaleString() ?? '...'} tons CO₂/yr (predicted)
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
