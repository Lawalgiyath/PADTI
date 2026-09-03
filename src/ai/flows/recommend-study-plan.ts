'use server';
/**
 * @fileOverview An AI Study Assistant that analyzes student performance and recommends personalized study topics or modules.
 *
 * - recommendStudyPlan - A function that provides personalized study recommendations.
 * - RecommendStudyPlanInput - The input type for the recommendStudyPlan function.
 * - RecommendStudyPlanOutput - The return type for the recommendStudyPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendStudyPlanInputSchema = z.object({
  studentName: z.string().describe("The student's name for personalization."),
  performanceData: z
    .array(
      z.object({
        courseName: z.string().describe('The name of the course.'),
        modules: z
          .array(
            z.object({
              moduleName: z.string().describe('The name of the module.'),
              assessmentScore: z
                .number()
                .min(0)
                .max(100)
                .describe('The score received in the module assessment (0-100).'),
              topicsCovered: z
                .array(z.string())
                .describe('A list of topics covered in this module.'),
            })
          )
          .describe('List of modules within the course with performance data.'),
      })
    )
    .describe('An array containing performance data for various courses and modules.'),
});
export type RecommendStudyPlanInput = z.infer<typeof RecommendStudyPlanInputSchema>;

const RecommendStudyPlanOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        topicOrModuleName: z
          .string()
          .describe('The specific topic or module recommended for study.'),
        reasoning: z
          .string()
          .describe('The reason for this recommendation, based on performance data.'),
        suggestedFocusAreas: z
          .array(z.string())
          .describe('Specific areas or sub-topics within the recommendation to focus on.'),
      })
    )
    .describe('A list of personalized study recommendations.'),
  overallSummary: z
    .string()
    .describe("An overall summary of the student's performance and general advice."),
});
export type RecommendStudyPlanOutput = z.infer<typeof RecommendStudyPlanOutputSchema>;

export async function recommendStudyPlan(
  input: RecommendStudyPlanInput
): Promise<RecommendStudyPlanOutput> {
  return recommendStudyPlanFlow(input);
}

const recommendStudyPlanPrompt = ai.definePrompt({
  name: 'recommendStudyPlanPrompt',
  input: { schema: RecommendStudyPlanInputSchema },
  output: { schema: RecommendStudyPlanOutputSchema },
  prompt: `You are an AI Study Assistant for PADTI, specialized in helping students efficiently improve their understanding and prepare for certification. Your goal is to analyze {{studentName}}'s performance data and suggest personalized topics or modules to focus on.

Here is {{studentName}}'s performance data:

{{#each performanceData}}
Course: {{courseName}}
  Modules:
  {{#each modules}}
  - Module: {{moduleName}}
    Assessment Score: {{assessmentScore}}%
    Topics Covered: {{#each topicsCovered}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  {{/each}}
{{/each}}

Analyze the provided performance data. Identify areas where {{studentName}} might need to improve, typically indicated by lower assessment scores (e.g., below 70%) or modules where understanding seems weaker.

Based on this analysis, generate a list of specific topics or modules that {{studentName}} should prioritize for study. For each recommendation, provide a clear reasoning explaining why it's recommended and suggest specific focus areas within that topic/module.

Finally, provide an overall summary of {{studentName}}'s performance and general advice.

Ensure your output is a JSON object matching the \
`RecommendStudyPlanOutputSchema`.
`,
});

const recommendStudyPlanFlow = ai.defineFlow(
  {
    name: 'recommendStudyPlanFlow',
    inputSchema: RecommendStudyPlanInputSchema,
    outputSchema: RecommendStudyPlanOutputSchema,
  },
  async (input) => {
    const { output } = await recommendStudyPlanPrompt(input);
    return output!;
  }
);
