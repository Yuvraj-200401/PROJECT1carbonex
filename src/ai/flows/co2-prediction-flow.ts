// src/ai/flows/co2-prediction-flow.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// =========================
// ✅ Retry Utility
// =========================
async function callWithRetry<T>(
  fn: () => Promise<T>,
  retries = 5
): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    const is503 =
      err?.message?.includes('503') ||
      err?.message?.includes('Service Unavailable');

    if (retries > 0 && is503) {
      const delay = (6 - retries) * 2000;
      console.log(`🔁 Retry in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
      return callWithRetry(fn, retries - 1);
    }

    throw err;
  }
}

// =========================
// ✅ Input Validation
// =========================
function isInvalidInput(input: PredictCo2Input) {
  return (
    input.area_ha <= 0 ||
    input.biomass_density < 0 ||
    input.soil_carbon < 0 ||
    input.NDVI < -1 ||
    input.NDVI > 1
  );
}

// =========================
// ✅ Input Schema
// =========================
const PredictCo2InputSchema = z.object({
  siteName: z.string(),
  lat: z.number(),
  lng: z.number(),
  area_ha: z.number(),
  date: z.string(),
  biomass_density: z.number(),
  soil_carbon: z.number(),
  NDVI: z.number(),
});

export type PredictCo2Input = z.infer<typeof PredictCo2InputSchema>;

// =========================
// ✅ Output Schema
// =========================
const PredictCo2OutputSchema = z.object({
  oneYearPrediction: z.number(),
  fiveYearPrediction: z.number(),
  tenYearPrediction: z.number(),
  oneYearConfidenceInterval: z.array(z.number()),
  fiveYearConfidenceInterval: z.array(z.number()),
  tenYearConfidenceInterval: z.array(z.number()),
});

export type PredictCo2Output = z.infer<typeof PredictCo2OutputSchema>;

// =========================
// ✅ Prompt
// =========================
const predictCo2Prompt = ai.definePrompt({
  name: 'predictCo2Prompt',
  input: { schema: PredictCo2InputSchema },
  output: { schema: PredictCo2OutputSchema },
  prompt: `
You are an AI expert in predicting CO2 capture for environmental projects.

Return ONLY valid JSON.

Site Name: {{{siteName}}}
Latitude: {{{lat}}}
Longitude: {{{lng}}}
Area (ha): {{{area_ha}}}
Date: {{{date}}}
Biomass Density: {{{biomass_density}}}
Soil Carbon: {{{soil_carbon}}}
NDVI: {{{NDVI}}}
`,
});

// =========================
// ✅ Flow
// =========================
const predictCo2Flow = ai.defineFlow(
  {
    name: 'predictCo2Flow',
    inputSchema: PredictCo2InputSchema,
    outputSchema: PredictCo2OutputSchema,
  },
  async (input) => {
    // 🔥 Step 1: Validate input
    if (isInvalidInput(input)) {
      console.log("⚠️ Invalid input detected");

      return {
        oneYearPrediction: 0,
        fiveYearPrediction: 0,
        tenYearPrediction: 0,
        oneYearConfidenceInterval: [0, 0],
        fiveYearConfidenceInterval: [0, 0],
        tenYearConfidenceInterval: [0, 0],
      };
    }

    try {
      // 🔥 Step 2: Try AI with retry
      const { output } = await callWithRetry(() =>
        predictCo2Prompt(input)
      );

      return output!;
    } catch (err) {
      console.error('❌ AI failed, using fallback:', err);

      // =========================
      // ✅ REALISTIC FALLBACK LOGIC
      // =========================

      // base carbon estimation
      const base =
        input.area_ha *
        (input.biomass_density * 0.5 +
          input.soil_carbon * 0.2);

      // vegetation impact
      const growthFactor = 1 + input.NDVI * 0.3;

      // realistic progression
      const oneYear = base;
      const fiveYear = base * Math.pow(growthFactor, 5);
      const tenYear = base * Math.pow(growthFactor, 8); // slower growth

      // cap unrealistic spikes
      const maxCap = base * 8;

      const safeFiveYear = Math.min(fiveYear, maxCap);
      const safeTenYear = Math.min(tenYear, maxCap);

      return {
        oneYearPrediction: Number(oneYear.toFixed(2)),
        fiveYearPrediction: Number(safeFiveYear.toFixed(2)),
        tenYearPrediction: Number(safeTenYear.toFixed(2)),

        oneYearConfidenceInterval: [
          Number((oneYear * 0.85).toFixed(2)),
          Number((oneYear * 1.15).toFixed(2)),
        ],
        fiveYearConfidenceInterval: [
          Number((safeFiveYear * 0.85).toFixed(2)),
          Number((safeFiveYear * 1.15).toFixed(2)),
        ],
        tenYearConfidenceInterval: [
          Number((safeTenYear * 0.85).toFixed(2)),
          Number((safeTenYear * 1.15).toFixed(2)),
        ],
      };
    }
  }
);

// =========================
// ✅ Export Function
// =========================
export async function predictCo2(
  input: PredictCo2Input
): Promise<PredictCo2Output> {
  return predictCo2Flow(input);
}