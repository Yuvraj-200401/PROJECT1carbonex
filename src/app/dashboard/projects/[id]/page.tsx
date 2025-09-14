
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProjectById, updateProjectStatus, Project } from '@/lib/demo-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowLeft, Check, Award, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { motion } from 'framer-motion';

export default function ProjectDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        if (id) {
            const foundProject = getProjectById(id);
            setProject(foundProject || null);
        }
    }, [id]);

    const handleMintTokens = () => {
        if (!project) return;
        updateProjectStatus(project.id, 'Minted');
        setProject(getProjectById(id) || null);
        toast({
            title: 'Tokens Minted!',
            description: `${project.prediction?.oneYearPrediction.toLocaleString()} CARBO tokens have been minted for ${project.siteName}.`
        });
    }

    const handleListOnMarketplace = () => {
        if (!project) return;
        updateProjectStatus(project.id, 'Listed');
        setProject(getProjectById(id) || null);
        toast({
            title: 'Project Listed!',
            description: 'Your tokens are now available on the marketplace.'
        });
    }

    if (!project) {
        return <div className="text-center">Project not found or loading...</div>;
    }

    const predictionData = project.prediction ? [
        { name: '1 Year', value: project.prediction.oneYearPrediction, interval: project.prediction.oneYearConfidenceInterval },
        { name: '5 Years', value: project.prediction.fiveYearPrediction, interval: project.prediction.fiveYearConfidenceInterval },
        { name: '10 Years', value: project.prediction.tenYearPrediction, interval: project.prediction.tenYearConfidenceInterval },
    ] : [];

    const statusConfig = {
        'Pending': { color: 'yellow', description: 'This project is awaiting review from a verifier.' },
        'Verified': { color: 'green', description: 'This project has been successfully verified.' },
        'Action Required': { color: 'red', description: 'This project requires changes. Please review the feedback.' },
        'Minted': { color: 'blue', description: 'Carbon credits have been minted into tokens.' },
        'Listed': { color: 'purple', description: 'Tokens are listed for sale on the marketplace.' },
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <Button variant="outline" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2" /> Back to Projects
            </Button>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column */}
                <div className="w-full lg:w-1/3">
                     <Card>
                        <CardHeader>
                            <Image 
                                src={project.imageUrl || `https://picsum.photos/seed/${project.id}/400/300`} 
                                alt={project.siteName}
                                width={400}
                                height={300}
                                className="rounded-lg w-full h-auto object-cover"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-2xl">{project.siteName}</CardTitle>
                             <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary">{project.status}</Badge>
                                <CardDescription>{statusConfig[project.status].description}</CardDescription>
                             </div>

                             <div className="mt-6 space-y-4 text-sm">
                                <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>Area</span>
                                    <span className='font-medium'>{project.area_ha} ha</span>
                                </div>
                                 <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>Location</span>
                                    <span className='font-mono text-xs'>{project.lat.toFixed(4)}, {project.lng.toFixed(4)}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>Submission Date</span>
                                    <span className='font-medium'>{new Date(project.date).toLocaleDateString()}</span>
                                </div>
                             </div>

                        </CardContent>
                     </Card>
                </div>
                
                {/* Right Column */}
                <div className="w-full lg:w-2/3 space-y-8">
                    {project.status === 'Verified' && (
                         <Card className="bg-primary/10 border-primary">
                            <CardHeader className="flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Project Verified!</CardTitle>
                                    <CardDescription>This project is now eligible for token minting.</CardDescription>
                                </div>
                                <Button onClick={handleMintTokens}>
                                    <Award className="mr-2"/> Mint Tokens
                                </Button>
                            </CardHeader>
                        </Card>
                    )}
                    {project.status === 'Minted' && (
                         <Card className="bg-primary/10 border-primary">
                            <CardHeader className="flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Tokens Minted!</CardTitle>
                                    <CardDescription>List your tokens on the marketplace to sell them.</CardDescription>
                                </div>
                                <Button onClick={handleListOnMarketplace}>
                                    <ShoppingCart className="mr-2"/> List on Marketplace
                                </Button>
                            </CardHeader>
                        </Card>
                    )}
                    {project.status === 'Action Required' && (
                        <Card className="border-destructive bg-destructive/10">
                            <CardHeader>
                                <CardTitle>Action Required</CardTitle>
                                <CardDescription>A verifier has requested changes. Please review the notes and resubmit.</CardDescription>
                            </CardHeader>
                        </Card>
                    )}


                    <Card>
                        <CardHeader>
                            <CardTitle>AI Verification Report</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
                                <p className="text-muted-foreground">Verification Score</p>
                                <p className="text-5xl font-bold text-primary">{project.verification?.verificationScore}%</p>
                            </div>
                            <div className="space-y-4">
                                <p><strong>Guideline Compliance:</strong> {project.verification?.guidelineCompliance}</p>
                                <p><strong>Anomaly Risk:</strong> {project.verification?.anomalyRisk}</p>
                                <p><strong>Completeness:</strong> {project.verification?.completenessPct}%</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>CO₂ Capture Prediction</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ResponsiveContainer width="100%" height={300}>
                             <LineChart data={predictionData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis label={{ value: 'Tons of CO₂', angle: -90, position: 'insideLeft' }}/>
                                <Tooltip
                                     contentStyle={{
                                        background: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                    }}
                                />
                                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} name="Predicted CO₂"/>
                             </LineChart>
                           </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}
