
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, RefreshCw, Clock, Leaf, FileCheck2, Award } from "lucide-react";
import Link from "next/link";
import { RecentVerificationsChart } from "../recent-verifications-chart";
import { Badge } from "../ui/badge";

export default function NGOOverview() {
    const stats = [
        { title: "Verified Credits (tCO₂)", value: "2,450", icon: <Award className="text-primary"/>, change: "+350 this month" },
        { title: "Pending Verifications", value: "3", icon: <RefreshCw className="text-secondary"/>, change: "" },
        { title: "Tokens Minted", value: "1,800", icon: <Leaf className="text-primary"/>, change: "+200 this month" },
    ];

    const recentActivities = [
        { id: 1, description: "Project 'Sulu Sea Seagrass' was successfully verified.", time: "2 hours ago", type: "Verification"},
        { id: 2, description: "1,500 CARBO tokens were minted for 'Sulu Sea Seagrass'.", time: "1 hour ago", type: "Minting"},
        { id: 3, description: "Your submission for 'Amazon Delta Reforestation' is now pending review.", time: "1 day ago", type: "Submission"},
        { id: 4, description: "AI verification for 'Coastal Blue Carbon Initiative' requires additional data.", time: "3 days ago", type: "Action Required"},
    ]
    
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <RecentVerificationsChart />
            </div>
            <div className="space-y-8">
                <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Ready to verify a new site?</CardTitle>
                        <CardDescription>Start the process to turn your conservation efforts into tangible, tradable assets.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/verify">
                            <Button>
                                Start New Verification <ArrowUpRight className="ml-2 size-4"/>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your projects.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                           {recentActivities.map(activity => (
                               <div key={activity.id} className="flex items-start gap-4">
                                   <div className="bg-muted p-2 rounded-full">
                                       <FileCheck2 className="size-4 text-muted-foreground"/>
                                   </div>
                                   <div>
                                        <p className="text-sm">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
