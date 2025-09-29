
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getProjects, Project, subscribe } from '@/lib/demo-data';
import { CheckCircle, Clock, Award, ArrowRight, Rss, Shield, AlertTriangle, Lightbulb, Vote, Hand, Map, Filter, Bell, Trees, Users, IndianRupee, Search, MoreHorizontal, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LiveMap } from './live-map';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const StatCard = ({ title, value, icon, description }: { title: string, value: string | number, icon: React.ReactNode, description: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

// --- MOCK DATA ---

const stateProgressData = [
  { state: 'Gujarat', restored_ha: 1200, carbon_t: 15000 },
  { state: 'West Bengal', restored_ha: 2500, carbon_t: 32000 },
  { state: 'Odisha', restored_ha: 800, carbon_t: 9500 },
  { state: 'Andhra Pradesh', restored_ha: 950, carbon_t: 11000 },
  { state: 'Maharashtra', restored_ha: 700, carbon_t: 8000 },
];

const threatFrequencyData = [
    { name: 'Mon', threats: 2 },
    { name: 'Tue', threats: 1 },
    { name: 'Wed', threats: 3 },
    { name: 'Thu', threats: 2 },
    { name: 'Fri', threats: 4 },
    { name: 'Sat', threats: 3 },
    { name: 'Sun', threats: 2 },
]

const newsUpdates = [
    { id: 1, category: 'Community', text: 'Successful mangrove planting drive in the Sundarbans, engaging 500+ volunteers.' },
    { id: 2, category: 'Government', text: 'MoEFCC announces new "Blue Credit" policy for coastal restoration grants.' },
    { id: 3, category: 'Alert', text: 'Illegal shrimp farming reported near Pichavaram mangroves, satellite imagery shared.' },
];

const possibleThreats = [
    { id: 1, text: 'Illegal fishing & trawling reported in Bhitarkanika protected zones.', severity: 'High', area: 'Odisha', acknowledged: false },
    { id: 2, text: 'High industrial pollution detected near the Gulf of Khambhat.', severity: 'Medium', area: 'Gujarat', acknowledged: true },
    { id: 3, text: 'Satellite shows possible encroachment for aquaculture in Krishna-Godavari delta.', severity: 'Medium', area: 'Andhra Pradesh', acknowledged: false },
    { id: 4, text: 'Increased deforestation rate observed near Ratnagiri mangroves.', severity: 'High', area: 'Maharashtra', acknowledged: false },
];

const communityInputs = [
    { id: 1, text: 'Request for solar-powered lights in Sundarban villages to reduce human-wildlife conflict.', votes: 120 },
    { id: 2, text: 'Observation of coral bleaching in Palk Bay, possibly due to rising sea temperatures.', votes: 75 },
]

const getSeverityBadge = (severity: 'High' | 'Medium' | 'Low' | string) => {
    switch (severity) {
        case 'High': return 'destructive';
        case 'Medium': return 'secondary';
        case 'Low': return 'default';
        default: return 'outline';
    }
}

export default function NGOOverview() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [threats, setThreats] = useState(possibleThreats);

    useEffect(() => {
        const refreshProjects = () => setProjects(getProjects());
        refreshProjects();
        const unsubscribe = subscribe(refreshProjects);
        return () => unsubscribe();
    }, []);

    const handleAcknowledgeThreat = (id: number) => {
        setThreats(currentThreats => currentThreats.map(t => t.id === id ? {...t, acknowledged: true} : t));
    };

    const pendingProjects = projects.filter(p => p.status === 'Pending').length;
    const verifiedProjects = projects.filter(p => p.status === 'Verified').length;
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            {/* --- HEADER --- */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">India Coastal Ecosystem Dashboard</h1>
                    <p className="text-muted-foreground">Monitor mangrove health, track restoration projects, and engage local communities.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Bell className="mr-2" /> View Alerts ({threats.filter(t => !t.acknowledged).length})</Button>
                    <Button onClick={() => router.push('/dashboard/verify')}><CheckCircle className="mr-2"/> New Project</Button>
                </div>
            </div>
      
            {/* --- STATS ROW --- */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Projects Under Review" value={pendingProjects} icon={<Clock />} description="Awaiting verification" />
                <StatCard title="Verified Projects" value={verifiedProjects} icon={<Shield />} description="Eligible for carbon credits" />
                <StatCard title="Carbon Sequestered (tCO₂e)" value={'75,500'} icon={<Trees />} description="Total verified credits generated in India" />
                <StatCard title="Community Members Engaged" value={'15,000+'} icon={<Users />} description="Livelihoods supported in coastal villages" />
            </div>

            {/* --- PROJECTS & THREATS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                         <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <CardTitle>My Organization's Projects</CardTitle>
                                <CardDescription>Overview of all submitted conservation projects.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative w-48">
                                    <Input placeholder="Search projects..." className="pl-8"/>
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                </div>
                                <Button variant="outline" size="sm"><Filter className="mr-2"/> Filter</Button>
                            </div>
                         </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projects.slice(0, 4).map(p => (
                                    <TableRow key={p.id}>
                                        <TableCell>
                                            <div className="font-medium">{p.siteName}</div>
                                            <div className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</div>
                                        </TableCell>
                                        <TableCell><Badge variant={p.status === 'Verified' ? 'default' : 'secondary'}>{p.status}</Badge></TableCell>
                                        <TableCell>
                                            <Progress value={p.status === 'Verified' ? 100 : p.status === 'Pending' ? 50 : 20} className="h-2 w-24"/>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => router.push(`/dashboard/projects/${p.id}`)}>
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Lightbulb /> AI-Powered Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-semibold text-primary">High Salinity Detected:</p>
                            <p className="text-sm text-muted-foreground mb-4">AI analysis of satellite data shows increasing soil salinity in the Mahanadi delta, which could impact mangrove sapling survival.</p>
                            <p className="text-sm font-semibold text-primary">Recommended Action:</p>
                            <div className="p-3 bg-muted rounded-lg text-sm">
                                Initiate freshwater flushing in affected zones and plant salt-tolerant species like *Avicennia marina*.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            {/* --- ALERTS, NEWS, COMMUNITY --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle /> Threats & Alerts</CardTitle>
                        <CardDescription>Real-time environmental and community-reported threats across India.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Threat</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {threats.map(threat => (
                                    <TableRow key={threat.id} className={threat.acknowledged ? 'opacity-60' : ''}>
                                        <TableCell className="font-medium">{threat.text}</TableCell>
                                        <TableCell>{threat.area}</TableCell>
                                        <TableCell><Badge variant={getSeverityBadge(threat.severity)}>{threat.severity}</Badge></TableCell>
                                        <TableCell className="text-right">
                                             <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" disabled={threat.acknowledged}>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleAcknowledgeThreat(threat.id)}>
                                                        <Check className="mr-2"/> Acknowledge
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Rss /> News & Updates</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                {newsUpdates.map(item => (
                                    <div key={item.id} className="flex items-start gap-3">
                                        <Badge variant={item.category === 'Alert' ? 'destructive' : 'secondary'} className="capitalize mt-1 h-fit">{item.category}</Badge>
                                        <p className="text-sm text-muted-foreground">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Vote /> Community Input</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {communityInputs.map(input => (
                                <div key={input.id}>
                                    <p className="text-sm font-medium">{input.text}</p>
                                    <div className="flex items-center gap-2">
                                        <Progress value={(input.votes / 150) * 100} className="h-2"/>
                                        <span className="text-xs font-bold">{input.votes} Votes</span>
                                    </div>
                                </div>
                            ))}
                            <Button className="w-full mt-2" variant="secondary"><Hand className="mr-2"/> Submit a Report</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* --- LIVE MAP SECTION --- */}
            <Card>
                <CardHeader>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                        <div>
                            <CardTitle className="flex items-center gap-2"><Map /> Live Threat & Activity Map of India</CardTitle>
                            <CardDescription>Real-time overview of field operations and environmental alerts on the Indian coastline.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm"><Filter className="mr-2"/> Filters</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>Map is temporarily unavailable. Please ensure your Google Maps API key is correctly configured in your Google Cloud project.</p>
                </CardContent>
            </Card>
      
        </motion.div>
    );
}
