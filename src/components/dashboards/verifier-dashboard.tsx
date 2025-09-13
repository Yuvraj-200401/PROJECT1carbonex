
'use client';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, FileText, Download } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { VerificationResults } from '../verification-results';
import { Co2PredictionChart } from '../co2-prediction-chart';
import type { VerificationResult } from '@/lib/types';


const initialSubmissions = [
  {
    ngo: "Amazon Delta Reforestation",
    date: "2023-10-22",
    status: "Pending",
    area: "5,000 ha"
  },
  {
    ngo: "Coastal Blue Carbon Initiative",
    date: "2023-10-20",
    status: "Pending",
    area: "850 ha"
  },
  {
    ngo: "Borneo Peatland Project",
    date: "2023-10-19",
    status: "Pending",
    area: "12,000 ha"
  },
];

// This is mock data that would come from the AI verification flow
const mockVerificationResult: VerificationResult = {
    verification: {
        verificationScore: 92,
        completenessPct: 98,
        guidelineCompliance: "The project data largely complies with NCCR guidelines. All required fields are present, and values are within expected ranges. Minor inconsistencies in timestamp formats were noted but automatically corrected.",
        anomalyRisk: "Low",
        detailedReport: {
            ruleBasedChecks: ["All GPS coordinates are valid.", "Timestamps are consistent.", "Sensor data ranges are within normal parameters."],
            anomalyDetectionResults: "No significant anomalies detected. A slight dip in soil carbon readings on 2023-10-15 corresponds with a recorded heavy rainfall event, which is an expected correlation.",
            imageQualityAssessment: 95
        }
    },
    prediction: {
        oneYearPrediction: 10000,
        fiveYearPrediction: 48000,
        tenYearPrediction: 95000,
        oneYearConfidenceInterval: [9500, 10500],
        fiveYearConfidenceInterval: [45000, 51000],
        tenYearConfidenceInterval: [89000, 101000]
    }
}


function ReviewDialog({ submission, onApprove, onReject }: { submission: typeof initialSubmissions[0], onApprove: () => void, onReject: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm"><FileText className="mr-2 size-4" /> Review</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                <DialogHeader>
                <DialogTitle>Review Submission: {submission.ngo}</DialogTitle>
                <DialogDescription>
                    Submitted on {submission.date}. Area: {submission.area}.
                </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto pr-6 space-y-6">
                    <p className="text-sm text-muted-foreground">The AI verification and prediction results are shown below. Please review the details and then approve or reject the submission.</p>
                     {mockVerificationResult.prediction && <Co2PredictionChart prediction={mockVerificationResult.prediction} />}
                     {mockVerificationResult.verification && <VerificationResults verification={mockVerificationResult.verification} />}
                </div>
                <DialogFooter className="flex-shrink-0">
                    <Button variant="outline" onClick={() => setIsOpen(false)}><Download className="mr-2"/> Download All Data</Button>
                    <div className="flex-grow" />
                    <Button variant="destructive" onClick={() => { onReject(); setIsOpen(false); }}><X className="mr-2"/> Reject</Button>
                    <Button onClick={() => { onApprove(); setIsOpen(false); }}><Check className="mr-2"/> Approve & Trigger Mint</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function VerifierDashboard() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState(initialSubmissions);

  const handleApprove = (ngoName: string) => {
    setSubmissions(subs => subs.filter(s => s.ngo !== ngoName));
    toast({
      title: "Submission Approved",
      description: `The project "${ngoName}" has been verified and tokens will be minted.`,
    });
  };

  const handleReject = (ngoName: string) => {
    setSubmissions(subs => subs.filter(s => s.ngo !== ngoName));
     toast({
      variant: "destructive",
      title: "Submission Rejected",
      description: `The project "${ngoName}" has been rejected. The NGO has been notified.`,
    });
  };

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Pending Submissions</h1>
        <p className="text-muted-foreground">Review and validate new carbon credit projects from NGOs.</p>
      </div>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Projects Awaiting Verification</CardTitle>
            <CardDescription>{submissions.length} projects require your review.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>NGO / Project Name</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {submissions.map((sub) => (
                        <TableRow key={sub.ngo}>
                            <TableCell className="font-medium">{sub.ngo}</TableCell>
                            <TableCell>{sub.date}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{sub.status}</Badge>
                            </TableCell>
                            <TableCell>{sub.area}</TableCell>
                            <TableCell className="text-right">
                                <ReviewDialog 
                                    submission={sub} 
                                    onApprove={() => handleApprove(sub.ngo)}
                                    onReject={() => handleReject(sub.ngo)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
