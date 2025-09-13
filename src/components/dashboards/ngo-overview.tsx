
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, RefreshCw, Clock } from "lucide-react";
import Link from "next/link";

export default function NGOOverview() {
    const stats = [
        { title: "Verified Credits (tCO₂)", value: "2,450", icon: <Check />, change: "+350 this month" },
        { title: "Pending Verifications", value: "3", icon: <RefreshCw />, change: "" },
        { title: "Tokens Minted", value: "1,800", icon: <Clock />, change: "+200 this month" },
    ];
    
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

      <div className="grid grid-cols-1 gap-8">
            <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Ready to verify a new site?</CardTitle>
                    <CardDescription>Start the process to turn your conservation efforts into tangible, tradable assets.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-6 text-sm">Our AI-powered platform makes verification faster and more transparent than ever before. Upload your project data to get started.</p>
                    <Link href="/dashboard/verify">
                        <Button>
                            Start New Verification <ArrowUpRight className="ml-2 size-4"/>
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
