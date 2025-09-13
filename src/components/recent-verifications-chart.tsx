
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { month: 'July', verified: 186 },
  { month: 'August', verified: 305 },
  { month: 'September', verified: 237 },
  { month: 'October', verified: 73 },
  { month: 'November', verified: 209 },
  { month: 'December', verified: 214 },
];

const chartConfig = {
  verified: {
    label: 'tCO₂ Verified',
    color: 'hsl(var(--primary))',
  },
};

export function RecentVerificationsChart() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>Recent Verifications</CardTitle>
        <CardDescription>Verified tCO₂ over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                bottom: 5,
                left: 0,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value) => `${value}`}
                unit=" t"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="verified" fill="var(--color-verified)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

