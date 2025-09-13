import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, Clock, List, RefreshCw } from "lucide-react";

export default function DashboardOverview() {
    const stats = [
        { title: "Total Projects", value: "12", icon: <List />, change: "+2 this month" },
        { title: "Verified Credits (tCO₂)", value: "2,450", icon: <Check />, change: "+350 this month" },
        { title: "Pending Verifications", value: "3", icon: <RefreshCw />, change: "" },
        { title: "Tokens Minted", value: "1,800", icon: <Clock />, change: "+200 this month" },
    ];

    const recentActivity = [
        { description: "Project 'Sulu Sea Seagrass' passed verification.", time: "2 hours ago", status: "success" },
        { description: "New data uploaded for 'Amazon Delta Reforestation'.", time: "1 day ago", status: "info" },
        { description: "150 CARBO tokens minted for 'Sulu Sea Seagrass'.", time: "30 minutes ago", status: "success" },
        { description: "Verification for 'Coastal Blue Carbon Initiative' requires attention.", time: "3 days ago", status: "warning" },
        { description: "You listed 100 CARBO for sale on the marketplace.", time: "4 days ago", status: "info" },
    ];
    
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, Eco Ventures!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your carbon credit portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="text-muted-foreground">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>An overview of recent events across your projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {recentActivity.map((activity, index) => (
                           <li key={index} className="flex items-start gap-4">
                                <div className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary/20">
                                  <div className={`h-2 w-2 rounded-full ${activity.status === 'success' ? 'bg-primary' : activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                           </li> 
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Ready to verify a new site?</CardTitle>
                    <CardDescription>Start the process to turn your conservation efforts into tangible, tradable assets.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-6 text-sm">Our AI-powered platform makes verification faster and more transparent than ever before. Upload your project data to get started.</p>
                    <Button>
                        Start New Verification <ArrowUpRight className="ml-2 size-4"/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
