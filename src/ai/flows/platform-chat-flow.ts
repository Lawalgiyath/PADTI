'use server';
/**
 * @fileOverview AI Platform Assistant for PADTI Connect.
 *
 * - platformChat - A function that handles general inquiries about the PADTI platform.
 * - PlatformChatInput - The input type for the platformChat function.
 * - PlatformChatOutput - The return type for the platformChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PlatformChatInputSchema = z.object({
  message: z.string().describe('The user\'s message or question.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string()
  })).optional().describe('Conversation history for context.'),
});
export type PlatformChatInput = z.infer<typeof PlatformChatInputSchema>;

const PlatformChatOutputSchema = z.object({
  reply: z.string().describe('The AI assistant\'s response.'),
});
export type PlatformChatOutput = z.infer<typeof PlatformChatOutputSchema>;

export async function platformChat(input: PlatformChatInput): Promise<PlatformChatOutput> {
  return platformChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'platformChatPrompt',
  input: { schema: PlatformChatInputSchema },
  output: { schema: PlatformChatOutputSchema },
  prompt: `You are the PADTI Connect Assistant, a helpful and professional AI guide for the Professional Articulated Driver Training Institute (PADTI).

Your goal is to help users navigate the platform and answer questions about our services.

Available Services & Links:
- Programs: Information about CDL Class A, Simulation, and Safety training.
- Career Marketplace (/career): Where employers find drivers and students find jobs.
- Driver Portal (/dashboard?role=driver): For student training, admissions, and payments.
- Employer Portal (/dashboard?role=employer): For fleet recruitment and credential verification.
- Admissions (/dashboard/admissions): Where students manage their enrollment.
- Learning (/dashboard/learning): The LMS for student course material.

Guidelines:
1. Be concise, friendly, and professional.
2. If a user asks about a specific action (like "how to apply"), guide them to the relevant section (Admissions).
3. If they ask about "jobs", mention the Career Marketplace.
4. Keep responses focused on logistics, driver training, and the PADTI platform.

Conversation History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User Message: {{{message}}}
`,
});

const platformChatFlow = ai.defineFlow(
  {
    name: 'platformChatFlow',
    inputSchema: PlatformChatInputSchema,
    outputSchema: PlatformChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
