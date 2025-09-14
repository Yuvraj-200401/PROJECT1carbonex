
"use server";

import { z } from "zod";
import { predictCo2 } from "@/ai/flows/co2-prediction-flow";
import { verifyCarbonCapture } from "@/ai/flows/ai-verification";
import type { VerificationResult } from "./types";

const formSchema = z.object({
  siteName: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  area_ha: z.coerce.number(),
  date: z.string(),
  biomass_density: z.coerce.number(),
  soil_carbon: z.coerce.number(),
  NDVI: z.coerce.number(),
  sampleMetadata: z.string(),
  csvData: z.instanceof(File),
  imageDataUri: z.string(),
});

export async function verifyAndPredict(prevState: any, formData: FormData): Promise<VerificationResult | null> {
  const validatedFields = formSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      error: "Invalid form data. Please check the fields and try again.",
    };
  }

  const { csvData, ...rest } = validatedFields.data;

  try {
    const [csvContent, prediction] = await Promise.all([
      csvData.text(),
      predictCo2(rest),
    ]);

    const verification = await verifyCarbonCapture({
      ...rest,
      csvData: csvContent,
    });
    
    // Simulate minting if score is high
    if (verification.verificationScore >= 80) {
        // In a real app, this would call a secure endpoint to mint tokens.
        // For this demo, we can just log it.
        console.log(`Minting ${Math.floor(prediction.oneYearPrediction)} CARBO tokens for ${rest.siteName}`);
    }

    return {
      verification,
      prediction,
    };
  } catch (error) {
    console.error("AI flow error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      error: `There was a problem with the AI verification process: ${errorMessage}`,
    };
  }
}
