import { z } from 'zod';

export const judgmentSchema = z.object({
  marketSummary: z.string().describe('A brief overview of the competitive landscape and how the startups compare within the generated world.'),
  judgeEvaluations: z.array(z.object({
    judgeId: z.enum(['elion-gusk', 'sam-aiman', 'jensen-jacket']).describe('The strict ID of the judge.'),
    judgeName: z.string(),
    rankings: z.array(z.object({
      entrepreneurId: z.string(),
      rank: z.number().int().min(1).max(3),
      score: z.number().int().min(1).max(10).describe('Overall score from this judge'),
      reasoning: z.string().describe('Why the judge gave this rank/score, in their persona voice.'),
    })),
  })).describe('Individual evaluations from each judge on the panel.'),
  winnerId: z.string().describe('The overall winner ID based on the consensus or highest aggregate score.'),
  finalVerdict: z.string().describe('The final announcement of the winner, synthesizing the judges opinions.'),
});
