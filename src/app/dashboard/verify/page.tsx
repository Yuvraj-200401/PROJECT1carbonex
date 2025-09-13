import { VerificationForm } from "@/components/verification-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyPage() {
  return (
    <div className="animate-fade-in-up space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">New Verification</h1>
            <p className="text-muted-foreground">
            Submit your project data for AI-powered verification and CO₂ prediction.
            </p>
        </div>
        <Card className="max-w-4xl mx-auto bg-card/30 backdrop-blur-sm">
             <CardHeader>
                <CardTitle>Project Data Submission</CardTitle>
                <CardDescription>Fill in the details below. Our AI will analyze your data and provide a comprehensive report.</CardDescription>
            </CardHeader>
            <CardContent>
                <VerificationForm />
            </CardContent>
        </Card>
    </div>
  );
}
