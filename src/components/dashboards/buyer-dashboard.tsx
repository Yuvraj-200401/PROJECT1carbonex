
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects, subscribe, Project } from '@/lib/demo-data';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Search, Leaf, Globe, BarChart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</div>
        </CardContent>
    </Card>
);

export default function BuyerDashboard() {
    const router = useRouter();
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        const refreshProjects = () => {
            const projects = getProjects();
            setAllProjects(projects);
        }
        refreshProjects();
        const unsubscribe = subscribe(refreshProjects);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let projectsToFilter = allProjects.filter(p => p.status === 'Listed');

        if (searchTerm) {
            projectsToFilter = projectsToFilter.filter(p => 
                p.siteName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (sortOrder) {
            case 'price_asc':
                projectsToFilter.sort((a, b) => (a.prediction?.oneYearPrediction || 0) - (b.prediction?.oneYearPrediction || 0));
                break;
            case 'price_desc':
                projectsToFilter.sort((a, b) => (b.prediction?.oneYearPrediction || 0) - (a.prediction?.oneYearPrediction || 0));
                break;
            case 'newest':
            default:
                projectsToFilter.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
        }

        setFilteredProjects(projectsToFilter);
    }, [searchTerm, sortOrder, allProjects]);

    const listedProjectsCount = allProjects.filter(p => p.status === 'Listed').length;
    
    const verifiedProjectsCount = allProjects.filter(p => ['Verified', 'Minted', 'Listed', 'Purchased'].includes(p.status)).length;
    
    const totalCarbonSequestered = allProjects
        .filter(p => p.prediction?.oneYearPrediction)
        .reduce((sum, p) => sum + p.prediction!.oneYearPrediction, 0);


    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div>
                <h1 className="text-3xl font-bold font-headline">Marketplace</h1>
                <p className="text-muted-foreground">Browse and purchase verified blue carbon credits to offset your footprint.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Total Verified Projects" value={verifiedProjectsCount} icon={<Globe />} />
                <StatCard title="Projects for Sale" value={listedProjectsCount} icon={<Leaf />} />
                <StatCard title="Total Carbon Sequestered (tCO₂e/yr)" value={totalCarbonSequestered.toLocaleString()} icon={<BarChart />} />
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="relative w-full md:w-1/2 lg:w-1/3">
                            <Input 
                                placeholder="Search by project name..." 
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-2">
                             <Select onValueChange={setSortOrder} defaultValue="newest">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="price_desc">Tokens (High-Low)</SelectItem>
                                    <SelectItem value="price_asc">Tokens (Low-High)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className='text-lg font-semibold'>No Credits Available</h3>
                            <p className="mt-2 text-muted-foreground">There are currently no carbon credits matching your criteria. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                >
                                    <Card 
                                        className="overflow-hidden h-full flex flex-col group cursor-pointer"
                                        onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                                    >
                                        <CardHeader className="p-0 relative">
                                            <Image
                                                src={project.imageUrl || "https://picsum.photos/seed/project-img/400/250"}
                                                alt={project.siteName}
                                                width={400}
                                                height={250}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <Badge className="absolute top-2 right-2">AI Verified</Badge>
                                        </CardHeader>
                                        <CardContent className="p-4 flex-grow flex flex-col">
                                            <CardTitle className="text-lg mb-2 flex-grow">{project.siteName}</CardTitle>
                                            <CardDescription>
                                                {project.lat.toFixed(2)}, {project.lng.toFixed(2)}
                                            </CardDescription>
                                            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                                <div>
                                                    <p className="font-bold text-primary text-xl">{project.prediction?.oneYearPrediction.toLocaleString()}</p>
                                                    <p className="text-sm text-muted-foreground">CARBO Tokens</p>
                                                </div>
                                                <Button variant="outline" size="sm">View Details</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
