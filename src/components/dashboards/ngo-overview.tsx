
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getProjects, Project } from '@/lib/demo-data';
import { CheckCircle, Clock, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, description }: { title: string, value: number, icon: React.ReactNode, description: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value.toLocaleString()}</div>
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


export default function NGOOverview() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const verifiedCount = projects.filter(p => p.status === 'Verified').length;
  const pendingCount = projects.filter(p => p.status === 'Pending').length;
  const tokensMinted = projects
    .filter(p => p.status === 'Minted' || p.status === 'Listed')
    .reduce((sum, p) => sum + (p.prediction?.oneYearPrediction || 0), 0);
  
  const recentActivities = projects.slice(0, 3);

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
    >
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back!</h1>
            <p className="text-muted-foreground">Here&apos;s a summary of your project activities.</p>
          </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Verified Credits" value={verifiedCount} icon={<CheckCircle />} description="Projects successfully verified" />
        <StatCard title="Pending Verifications" value={pendingCount} icon={<Clock />} description="Projects awaiting review" />
        <StatCard title="Tokens Minted" value={tokensMinted} icon={<Award />} description="Total CARBO tokens minted" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>Monthly verified credits this year.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent))' }}
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="credits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                        {recentActivities.map(activity => (
                             <div key={activity.id} className="flex items-center">
                                <div className="p-2 bg-muted rounded-full mr-4">
                                    {activity.status === 'Verified' ? <CheckCircle className="text-primary"/> : <Clock className="text-muted-foreground"/>}
                                </div>
                                <div>
                                    <p className="font-medium">{activity.siteName}</p>
                                    <p className="text-sm text-muted-foreground">Status: <span className="font-semibold">{activity.status}</span></p>
                                </div>
                            </div>
                        ))}
                         {recentActivities.length === 0 && (
                            <p className='text-sm text-muted-foreground text-center'>No recent project activity.</p>
                        )}
                   </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </motion.div>
  );
}
