'use server';

/**
 * @fileOverview An AI verification flow for carbon capture projects.
 *
 * - verifyCarbonCapture - A function that handles the verification process.
 * - VerifyCarbonCaptureInput - The input type for the verifyCarbonCapture function.
 * - VerifyCarbonCaptureOutput - The return type for the verifyCarbonCapture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyCarbonCaptureInputSchema = z.object({
  csvData: z.string().describe('The CSV data containing site information.'),
  imageDataUri: z
    .string()
    .describe(
      "A photo of the site, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  siteName: z.string().describe('The name of the site.'),
  lat: z.number().describe('The latitude of the site.'),
  lng: z.number().describe('The longitude of the site.'),
  area_ha: z.number().describe('The area of the site in hectares.'),
  date: z.string().describe('The date the data was collected.'),
  sampleMetadata: z.string().describe('Additional metadata about the sample.'),
});
export type VerifyCarbonCaptureInput = z.infer<typeof VerifyCarbonCaptureInputSchema>;

const VerifyCarbonCaptureOutputSchema = z.object({
  verificationScore: z
    .number()
    .describe('The overall verification score for the project.'),
  completenessPct: z.number().describe('The completeness percentage of the data.'),
  guidelineCompliance: z
    .string()
    .describe('A summary of compliance with NCCR guidelines.'),
  anomalyRisk: z.string().describe('An assessment of anomaly risk in the data.'),
  detailedReport: z.object({
    ruleBasedChecks: z.array(z.string()).describe('Results of rule-based checks.'),
    anomalyDetectionResults: z
      .string()
      .describe('Results of anomaly detection analysis.'),
    imageQualityAssessment: z
      .number()
      .describe('Score from image quality and vegetation check (0-100).'),
  }).describe('A detailed report of the verification process.'),
});
export type VerifyCarbonCaptureOutput = z.infer<typeof VerifyCarbonCaptureOutputSchema>;

export async function verifyCarbonCapture(
  input: VerifyCarbonCaptureInput
): Promise<VerifyCarbonCaptureOutput> {
  return verifyCarbonCaptureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyCarbonCapturePrompt',
  input: {schema: VerifyCarbonCaptureInputSchema},
  output: {schema: VerifyCarbonCaptureOutputSchema},
  prompt: `You are an AI verifier for carbon capture projects, assessing their eligibility for tokenization.

  Evaluate the project based on the provided data and image, and generate a verification score and report.

  Consider the following information:
  Site Name: {{{siteName}}}
  Latitude: {{{lat}}}
  Longitude: {{{lng}}}
  Area (ha): {{{area_ha}}}
  Date: {{{date}}}
  Sample Metadata: {{{sampleMetadata}}}
  CSV Data: {{{csvData}}}
  Image: {{media url=imageDataUri}}

  Provide a verification score, completeness percentage, guideline compliance summary, anomaly risk assessment, and a detailed report.
  Ensure the output is well-formatted and easy to understand.
  `,
});

const verifyCarbonCaptureFlow = ai.defineFlow(
  {
    name: 'verifyCarbonCaptureFlow',
    inputSchema: VerifyCarbonCaptureInputSchema,
    outputSchema: VerifyCarbonCaptureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
