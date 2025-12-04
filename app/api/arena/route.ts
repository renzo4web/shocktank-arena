import { streamObject } from 'ai';
import { z } from 'zod';

const worldScenarioSchema = z.object({
  technology: z.string().describe('A key emerging technology that will shape the world'),
  socialConflict: z.string().describe('A major social conflict or tension in society'),
  culturalTrend: z.string().describe('A dominant cultural trend or movement'),
  description: z.string().describe('A brief narrative description of this world scenario'),
});

export async function POST(req: Request) {
  const input = await req.json();

  const result = streamObject({
    model: 'anthropic/claude-sonnet-4.5',
    system: 'You are the World Builder AI, creating unique and compelling scenarios for startup simulations. Generate creative, balanced worlds that provide interesting challenges for entrepreneurs.',
    prompt: typeof input === 'string' ? input : input.prompt || 'Create a new world scenario for the ShockTank Arena simulation.',
    schema: worldScenarioSchema,
    schemaName: 'WorldScenario',
    schemaDescription: 'A unique world scenario for the ShockTank Arena simulation',
  });

  return result.toTextStreamResponse();
}