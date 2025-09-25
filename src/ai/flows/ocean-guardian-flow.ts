
'use server';
/**
 * @fileOverview An AI assistant for the CARBO-NEX platform.
 *
 * - oceanGuardian - The main flow function for the assistant.
 * - OceanGuardianInput - The input schema for the flow.
 * - OceanGuardianOutput - The output schema for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OceanGuardianInputSchema = z.object({
  query: z.string().describe('The user\'s question or command.'),
  userId: z.string().optional().describe('The ID of the logged-in user, if available.'),
});
export type OceanGuardianInput = z.infer<typeof OceanGuardianInputSchema>;

const OceanGuardianOutputSchema = z.object({
  reply: z.string().describe('The AI\'s response to the user.'),
});
export type OceanGuardianOutput = z.infer<typeof OceanGuardianOutputSchema>;

// Placeholder function to simulate fetching real-time data
const getProjectData = ai.defineTool(
    {
        name: 'getProjectData',
        description: 'Retrieves real-time data for a user\'s adopted tree or project.',
        inputSchema: z.object({
            dataType: z.enum(['carbon_stored_today', 'growth_progress']).describe('The type of data to fetch.')
        }),
        outputSchema: z.string(),
    },
    async ({dataType}) => {
        // In a real application, this would fetch data from Firestore or another backend service.
        if (dataType === 'carbon_stored_today') {
            return `Your mangrove has stored ${(Math.random() * 0.5 + 0.1).toFixed(2)} kg of CO₂ today.`;
        }
        if (dataType === 'growth_progress') {
            return `Your adopted tree has grown ${(Math.random() * 2 + 0.5).toFixed(1)} cm in the last month! It is now ${(Math.random() * 50 + 100).toFixed(0)} cm tall.`;
        }
        return "I couldn't find that specific data.";
    }
);


const prompt = ai.definePrompt({
  name: 'oceanGuardianPrompt',
  input: { schema: OceanGuardianInputSchema },
  output: { schema: OceanGuardianOutputSchema },
  tools: [getProjectData],
  prompt: `You are the "Ocean Guardian," a friendly and knowledgeable AI assistant for the CARBO-NEX platform.
  Your purpose is to educate users about blue carbon, explain how the platform works, and provide personalized data about their impact if they are logged in.

  Your personality:
  - Enthusiastic and encouraging.
  - Knowledgeable about marine ecosystems, especially mangroves and seagrass.
  - Passionate about conservation.
  - Use simple, clear language. Avoid overly technical jargon.
  - Keep responses concise and to the point.

  Context:
  - The platform is called CARBO-NEX.
  - It allows NGOs to get their blue carbon projects (like mangrove restoration) verified.
  - Verified projects have their carbon credits turned into "CARBO" tokens on a blockchain.
  - Buyers can purchase these tokens on a marketplace to support conservation and offset their carbon footprint.
  - Users can sometimes "adopt" a specific tree or part of a project.

  How to answer:
  1.  If the user asks a general question about blue carbon, mangroves, seagrass, or how the platform works, provide a clear, educational answer.
  2.  If the user is logged in (a userId is provided) and asks for personal data like "my tree" or "my carbon stored", use the 'getProjectData' tool to fetch the information.
  3.  If the user is NOT logged in (no userId) and asks for personal data, politely explain that they need to log in to see their specific data and then provide a general educational answer. For example: "To see your tree's progress, you'll need to log in. Generally, a healthy mangrove can store up to four times more carbon than a terrestrial tree!"
  4.  Keep your answers conversational.

  User's question: {{{query}}}
  {{#if userId}}
  User ID: {{{userId}}}
  {{/if}}
  `,
});


const oceanGuardianFlow = ai.defineFlow(
  {
    name: 'oceanGuardianFlow',
    inputSchema: OceanGuardianInputSchema,
    outputSchema: OceanGuardianOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

// Wrapper function for client-side usage
export async function oceanGuardian(input: OceanGuardianInput): Promise<OceanGuardianOutput> {
  return oceanGuardianFlow(input);
}
