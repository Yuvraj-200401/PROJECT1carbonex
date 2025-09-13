// src/ai/flows/co2-prediction-flow.ts
'use server';

/**
 * @fileOverview Predicts future CO2 capture for a project using a RandomForest regressor.
 *
 * - predictCo2 - A function that handles the CO2 prediction process.
 * - PredictCo2Input - The input type for the predictCo2 function.
 * - PredictCo2Output - The return type for the predictCo2 function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCo2InputSchema = z.object({
  siteName: z.string().describe('The name of the site.'),
  lat: z.number().describe('The latitude of the site.'),
  lng: z.number().describe('The longitude of the site.'),
  area_ha: z.number().describe('The area of the site in hectares.'),
  date: z.string().describe('The date of the data collection.'),
  biomass_density: z.number().describe('The biomass density of the site.'),
  soil_carbon: z.number().describe('The soil carbon content of the site.'),
  NDVI: z.number().describe('The Normalized Difference Vegetation Index of the site.'),
});
export type PredictCo2Input = z.infer<typeof PredictCo2InputSchema>;

const PredictCo2OutputSchema = z.object({
  oneYearPrediction: z
    .number()
    .describe('The predicted CO2 capture in tons for 1 year.'),
  fiveYearPrediction: z
    .number()
    .describe('The predicted CO2 capture in tons for 5 years.'),
  tenYearPrediction: z
    .number()
    .describe('The predicted CO2 capture in tons for 10 years.'),
  oneYearConfidenceInterval: z
    .array(z.number())
    .describe('The confidence interval for the 1 year prediction.'),
  fiveYearConfidenceInterval: z
    .array(z.number())
    .describe('The confidence interval for the 5 year prediction.'),
  tenYearConfidenceInterval: z
    .array(z.number())
    .describe('The confidence interval for the 10 year prediction.'),
});
export type PredictCo2Output = z.infer<typeof PredictCo2OutputSchema>;

export async function predictCo2(input: PredictCo2Input): Promise<PredictCo2Output> {
  return predictCo2Flow(input);
}

const predictCo2Prompt = ai.definePrompt({
  name: 'predictCo2Prompt',
  input: {schema: PredictCo2InputSchema},
  output: {schema: PredictCo2OutputSchema},
  prompt: `You are an AI expert in predicting CO2 capture for environmental projects.

  Based on the following input data, predict the CO2 capture in tons for 1 year, 5 years, and 10 years. Also, provide confidence intervals for each prediction.

  Site Name: {{{siteName}}}
  Latitude: {{{lat}}}
  Longitude: {{{lng}}}
  Area (ha): {{{area_ha}}}
  Date: {{{date}}}
  Biomass Density: {{{biomass_density}}}
  Soil Carbon: {{{soil_carbon}}}
  NDVI: {{{NDVI}}}

  Present your response in a JSON format that is parseable by Typescript.
  `,
});

const predictCo2Flow = ai.defineFlow(
  {
    name: 'predictCo2Flow',
    inputSchema: PredictCo2InputSchema,
    outputSchema: PredictCo2OutputSchema,
  },
  async input => {
    const {output} = await predictCo2Prompt(input);
    return output!;
  }
);
