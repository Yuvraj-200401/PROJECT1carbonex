'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { PredictCo2Output } from '@/ai/flows/co2-prediction-flow';

type Props = {
  prediction: PredictCo2Output;
};

export function Co2PredictionChart({ prediction }: Props) {
  const chartData = [
    { label: '1 Year', tons: prediction.oneYearPrediction, interval: prediction.oneYearConfidenceInterval },
    { label: '5 Years', tons: prediction.fiveYearPrediction, interval: prediction.fiveYearConfidenceInterval },
    { label: '10 Years', tons: prediction.tenYearPrediction, interval: prediction.tenYearConfidenceInterval },
  ];

  const chartConfig = {
    tons: {
      label: 'tCO₂',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>CO₂ Sequestration Prediction</CardTitle>
        <CardDescription>
          Projected tons of CO₂ captured over time based on your provided data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} unit=" t" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent
                    formatter={(value, name, props) => (
                        <div className="flex flex-col">
                            <span>{`${value.toLocaleString()} tCO₂`}</span>
                            <span className="text-xs text-muted-foreground">
                                Confidence: {props.payload.interval[0].toFixed(1)} - {props.payload.interval[1].toFixed(1)} tCO₂
                            </span>
                        </div>
                    )}
                 />}
              />
              <Bar dataKey="tons" fill="var(--color-tons)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
