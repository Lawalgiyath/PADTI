'use server';
/**
 * @fileOverview An AI Study Assistant that answers student questions based on provided course material.
 *
 * - answerCourseContentQuestions - A function that handles answering questions about course content.
 * - AnswerCourseContentQuestionsInput - The input type for the answerCourseContentQuestions function.
 * - AnswerCourseContentQuestionsOutput - The return type for the answerCourseContentQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerCourseContentQuestionsInputSchema = z.object({
  question: z.string().describe('The student\'s question about the course material.'),
  courseContent: z.string().describe('The relevant course material for answering the question.'),
});
export type AnswerCourseContentQuestionsInput = z.infer<typeof AnswerCourseContentQuestionsInputSchema>;

const AnswerCourseContentQuestionsOutputSchema = z.object({
  answer: z.string().describe('A concise and accurate explanation to the student\'s question, based on the provided course material.'),
});
export type AnswerCourseContentQuestionsOutput = z.infer<typeof AnswerCourseContentQuestionsOutputSchema>;

export async function answerCourseContentQuestions(input: AnswerCourseContentQuestionsInput): Promise<AnswerCourseContentQuestionsOutput> {
  return answerCourseContentQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerCourseContentQuestionsPrompt',
  input: {schema: AnswerCourseContentQuestionsInputSchema},
  output: {schema: AnswerCourseContentQuestionsOutputSchema},
  prompt: `You are an AI Study Assistant, designed to help students understand their course materials.

Answer the following question as accurately and concisely as possible, using ONLY the provided course material as your source of information. If the course material does not contain the answer, state that you cannot find the information in the provided content.

Course Material:
"""{{{courseContent}}}"""

Student Question: """{{{question}}}"""
`,
});

const answerCourseContentQuestionsFlow = ai.defineFlow(
  {
    name: 'answerCourseContentQuestionsFlow',
    inputSchema: AnswerCourseContentQuestionsInputSchema,
    outputSchema: AnswerCourseContentQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
