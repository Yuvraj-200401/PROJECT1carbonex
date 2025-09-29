
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getProjects, Project, subscribe } from '@/lib/demo-data';
import { CheckCircle, Clock, Award, ArrowRight, Rss, Shield, AlertTriangle, Lightbulb, Vote, Hand, Map, Filter, Bell, Trees, Users, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LiveMap } from './live-map';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

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
    { id: 1, category: 'Community', text: 'Successful mangrove planting drive in the Sundarbans.' },
    { id: 2, category: 'Government', text: 'MoEFCC announces new coastal restoration grants.' },
    { id: 3, category: 'Alert', text: 'Illegal shrimp farming reported near Pichavaram mangroves.' },
];

const possibleThreats = [
    { id: 1, text: 'Illegal fishing in Bhitarkanika protected zones.', severity: 'High', area: 'Odisha' },
    { id: 2, text: 'Pollution from industrial clusters near the Gulf of Khambhat.', severity: 'Medium', area: 'Gujarat' },
    { id: 3, text: 'Encroachment for aquaculture in Krishna-Godavari delta.', severity: 'Low', area: 'Andhra Pradesh' },
];

const communityInputs = [
    { id: 1, text: 'Request for solar lights in Sundarban villages.', votes: 120 },
    { id: 2, text: 'Observation of coral bleaching in Palk Bay.', votes: 75 },
]


export default function NGOOverview() {
  const router = useRouter();
  
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
            <h1 className="text-3xl font-bold font-headline">India Coastal Ecosystem Dashboard</h1>
            <p className="text-muted-foreground">Monitor mangrove health, track restoration projects, and engage local communities.</p>
          </div>
          <Button variant="outline"><Bell className="mr-2" /> View Alerts (3)</Button>
      </div>
      
      {/* --- STATS ROW --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Mangrove Cover Restored" value={'6,150 ha'} icon={<Trees />} description="Across all Indian coastal states" />
        <StatCard title="Carbon Sequestered" value={'75,500 tCO₂e'} icon={<CheckCircle />} description="Total verified carbon credits generated" />
        <StatCard title="Community Members Engaged" value={'15,000+'} icon={<Users />} description="Livelihoods supported in coastal villages" />
      </div>
      
      {/* --- STATE-WISE PROGRESS & THREATS --- */}
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3">
                 <CardHeader>
                    <CardTitle>State-wise Progress</CardTitle>
                    <CardDescription>Restoration and carbon capture breakdown by state.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>State</TableHead>
                                <TableHead>Area Restored (ha)</TableHead>
                                <TableHead>Carbon Captured (tCO₂e)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stateProgressData.map(d => (
                                <TableRow key={d.state}>
                                    <TableCell className="font-medium">{d.state}</TableCell>
                                    <TableCell>{d.restored_ha.toLocaleString()}</TableCell>
                                    <TableCell>{d.carbon_t.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <div className="lg:col-span-2 space-y-6">
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

      {/* --- THREATS AND COMMUNITY ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield /> Threat Monitoring (India)</CardTitle>
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
              <div className="flex justify-between items-center">
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
            <LiveMap />
          </CardContent>
      </Card>
      
    </motion.div>
  );
}
