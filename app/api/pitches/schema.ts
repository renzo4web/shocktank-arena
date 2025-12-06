import { z } from 'zod';

export const pitchSchema = z.object({
  startupName: z.string().describe('The catchy name of the startup'),
  tagline: z.string().describe('A short, punchy tagline describing the value prop (max 10 words)'),
  problem: z.string().describe('The specific problem this startup solves (max 30 words)'),
  solution: z.string().describe('The innovative solution being proposed (max 30 words)'),
  targetMarket: z.string().describe('Who this product is for (max 30 words)'),
  monetization: z.string().describe('How the startup plans to make money (max 30 words)'),
  whyNow: z.string().describe('Why this world scenario makes this the perfect time for this startup (max 30 words)'),
});

export type Pitch = z.infer<typeof pitchSchema>;
