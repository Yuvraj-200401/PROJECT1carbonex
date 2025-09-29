
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getProjects, Project, subscribe } from '@/lib/demo-data';
import { CheckCircle, Clock, Award, ArrowRight, Rss, Shield, AlertTriangle, Lightbulb, Vote, Hand, Map, Filter, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LiveMap } from './live-map';

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

const chartData = [
  { month: 'Jan', credits: 400 },
  { month: 'Feb', credits: 300 },
  { month: 'Mar', credits: 500 },
  { month: 'Apr', credits: 800 },
  { month: 'May', credits: 600 },
  { month: 'Jun', credits: 750 },
];

const threatFrequencyData = [
    { name: 'Mon', threats: 4 },
    { name: 'Tue', threats: 3 },
    { name: 'Wed', threats: 5 },
    { name: 'Thu', threats: 2 },
    { name: 'Fri', threats: 8 },
    { name: 'Sat', threats: 6 },
    { name: 'Sun', threats: 7 },
]

const newsUpdates = [
    { id: 1, category: 'Community', text: 'Successful mangrove planting event last weekend at Site B.' },
    { id: 2, category: 'Government', text: 'New environmental protection grant announced.' },
    { id: 3, category: 'Alert', text: 'Illegal logging reported near the northern boundary.' },
];

const possibleThreats = [
    { id: 1, text: 'Illegal fishing activities in protected zones.', severity: 'High', area: 'Zone A' },
    { id: 2, text: 'Pollution runoff from nearby factories.', severity: 'Medium', area: 'River Delta' },
    { id: 3, text: 'Potential encroachment on conservation land.', severity: 'Low', area: 'West Boundary' },
];

const communityInputs = [
    { id: 1, text: 'Request for more waste bins near the beach.', votes: 45 },
    { id: 2, text: 'Observation of unusual algae bloom.', votes: 28 },
]


export default function NGOOverview() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const refreshProjects = () => setProjects(getProjects());
    refreshProjects();
    const unsubscribe = subscribe(refreshProjects);
    return () => unsubscribe();
  }, []);

  const verifiedCount = projects.filter(p => p.status === 'Verified').length;
  const pendingCount = projects.filter(p => p.status === 'Pending').length;
  const tokensMinted = projects
    .filter(p => p.status === 'Minted' || p.status === 'Listed')
    .reduce((sum, p) => sum + (p.prediction?.oneYearPrediction || 0), 0);
  
  const recentActivities = projects.slice(0, 3);

  const getSeverityBadge = (severity: 'High' | 'Medium' | 'Low' | string) => {
    switch (severity) {
        case 'High': return 'destructive';
        case 'Medium': return 'secondary';
        case 'Low': return 'default';
        default: return 'outline';
    }
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
            <h1 className="text-3xl font-bold font-headline">NGO & Community Dashboard</h1>
            <p className="text-muted-foreground">Monitor environmental health, track projects, and engage your community.</p>
          </div>
          <Button variant="outline"><Bell className="mr-2" /> View Alerts (3)</Button>
      </div>
      
      {/* --- STATS ROW --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Verified Projects" value={verifiedCount} icon={<CheckCircle />} description="Projects successfully verified" />
        <StatCard title="Pending Verifications" value={pendingCount} icon={<Clock />} description="Projects awaiting review" />
        <StatCard title="Active Threats" value={possibleThreats.length} icon={<AlertTriangle className="text-destructive" />} description="Urgent issues needing attention" />
      </div>

      {/* --- THREATS AND INSIGHTS ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield /> Threat Monitoring</CardTitle>
                <CardDescription>Overview of potential and active environmental risks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-2">Possible Threats</h4>
                    <div className="space-y-3">
                        {possibleThreats.map(threat => (
                            <div key={threat.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                                <div>
                                    <p className="font-medium">{threat.text}</p>
                                    <p className="text-xs text-muted-foreground">Area: {threat.area}</p>
                                </div>
                                <Badge variant={getSeverityBadge(threat.severity)}>{threat.severity}</Badge>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Threat Frequency (Last 7 Days)</h4>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={threatFrequencyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--accent))' }}
                                contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                            />
                            <Bar dataKey="threats" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
        
        <div className="space-y-6">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb /> AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-semibold text-primary">Emerging Threat Detected:</p>
                    <p className="text-sm text-muted-foreground mb-4">Increased boat traffic in the "Coral Gardens" protected zone may indicate illegal tourism.</p>
                    <p className="text-sm font-semibold text-primary">Recommended Action:</p>
                    <div className="p-3 bg-muted rounded-lg text-sm">
                        Dispatch a patrol to the area and notify local authorities. Consider increasing signage about protected zone status.
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
                                <Progress value={(input.votes / 50) * 100} className="h-2"/>
                                <span className="text-xs font-bold">{input.votes} Votes</span>
                            </div>
                        </div>
                    ))}
                    <Button className="w-full mt-2" variant="secondary"><Hand className="mr-2"/> Submit a Report</Button>
                </CardContent>
            </Card>
        </div>
      </div>


      {/* --- NEWS AND ACTIVITY ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Rss /> News & Updates</CardTitle>
            <CardDescription>Latest environmental news and community announcements.</CardDescription>
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

        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Ready to verify a new site?</CardTitle>
                    <CardDescription>Submit your project data to get it verified and tokenized.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" onClick={() => router.push('/dashboard/verify')}>
                        Start New Verification <ArrowRight className="ml-2"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
      
      {/* --- LIVE MAP SECTION --- */}
      <Card>
          <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                    <CardTitle className="flex items-center gap-2"><Map /> Live Threat & Activity Map</CardTitle>
                    <CardDescription>Real-time overview of field operations and environmental alerts.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"><Filter className="mr-2"/> Filters</Button>
                </div>
              </div>
          </CardHeader>
          <CardContent>
            <LiveMap />
          </CardContent>
      </Card>
      
    </motion.div>
  );
}
