
'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects, purchaseProject, subscribe, Project } from '@/lib/demo-data';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function BuyerDashboard() {
    const [listedProjects, setListedProjects] = useState<Project[]>([]);

    const refreshProjects = () => {
        const allProjects = getProjects();
        setListedProjects(allProjects.filter(p => p.status === 'Listed'));
    }
    
    useEffect(() => {
        refreshProjects();
        const unsubscribe = subscribe(refreshProjects);
        return () => unsubscribe();
    }, []);

    const handlePurchase = (project: Project) => {
        purchaseProject(project.id);
        toast({
            title: "Purchase Successful!",
            description: `You have successfully purchased credits from ${project.siteName}.`,
        });
    }
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Marketplace</h1>
                    <p className="text-muted-foreground">Browse and purchase verified blue carbon credits.</p>
                </div>
            </div>

            {listedProjects.length === 0 ? (
                <Card className="text-center p-12">
                     <CardTitle>No Credits Available</CardTitle>
                     <CardDescription className="mt-2">There are currently no carbon credits listed for sale on the marketplace. Please check back later.</CardDescription>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listedProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Card className="overflow-hidden">
                                <CardHeader className="p-0">
                                    <Image
                                        src={project.imageUrl || "https://picsum.photos/seed/project-img/400/250"}
                                        alt={project.siteName}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover"
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-xl mb-2">{project.siteName}</CardTitle>
                                    <CardDescription>Verified by CARBO-NEX AI</CardDescription>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-primary text-2xl">{project.prediction?.oneYearPrediction.toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground">CARBO Tokens</p>
                                        </div>
                                        <Button onClick={() => handlePurchase(project)}>Purchase</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    )
}
