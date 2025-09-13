import { type PredictCo2Output } from "@/ai/flows/co2-prediction-flow";
import { type VerifyCarbonCaptureOutput } from "@/ai/flows/ai-verification";

export type VerificationResult = {
    verification?: VerifyCarbonCaptureOutput;
    prediction?: PredictCo2Output;
    error?: string;
}
