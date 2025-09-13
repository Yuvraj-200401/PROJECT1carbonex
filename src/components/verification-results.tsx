'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Download, Send, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { VerifyCarbonCaptureOutput } from '@/ai/flows/ai-verification';

type Props = {
  verification: VerifyCarbonCaptureOutput;
};

const MetricCard = ({ title, value, unit, children }: { title: string; value: string | number; unit?: string; children?: React.ReactNode }) => (
    <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">
        {value}
        {unit && <span className="text-base font-normal">{unit}</span>}
        </p>
        {children}
    </div>
)

export function VerificationResults({ verification }: Props) {
  const {
    verificationScore,
    completenessPct,
    guidelineCompliance,
    anomalyRisk,
    detailedReport,
  } = verification;
  
  const isVerified = verificationScore >= 80;

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-2xl font-headline">Verification Report</CardTitle>
                <CardDescription>
                AI-powered analysis of your project data.
                </CardDescription>
            </div>
            <Badge className={`text-lg px-4 py-2 ${isVerified ? 'bg-primary text-primary-foreground' : 'bg-destructive text-destructive-foreground'}`}>
                {isVerified ? <Check className="mr-2" /> : <AlertTriangle className="mr-2" />}
                {isVerified ? 'Verified' : 'Action Required'}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Overall Score" value={verificationScore} unit="/100">
                <Progress value={verificationScore} className="h-2 mt-2" />
            </MetricCard>
             <MetricCard title="Data Completeness" value={completenessPct} unit="%">
                <Progress value={completenessPct} className="h-2 mt-2" />
            </MetricCard>
             <MetricCard title="Image Quality" value={detailedReport.imageQualityAssessment} unit="/100">
                <Progress value={detailedReport.imageQualityAssessment} className="h-2 mt-2" />
            </MetricCard>
            <MetricCard title="Anomaly Risk" value={anomalyRisk} />
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Guideline Compliance</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
                {guidelineCompliance}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Detailed Report</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Rule-Based Checks</h4>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {detailedReport.ruleBasedChecks.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Anomaly Detection</h4>
                        <p className="text-muted-foreground">{detailedReport.anomalyDetectionResults}</p>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </CardContent>
      <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">
            <Download className="mr-2 size-4" />
            Download Report
          </Button>
          {isVerified && (
            <Button>
                <Send className="mr-2 size-4" />
                Mint CARBO Tokens
            </Button>
          )}
      </CardFooter>
    </Card>
  );
}
