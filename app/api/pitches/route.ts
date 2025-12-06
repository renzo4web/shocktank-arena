import { streamObject } from 'ai';
import { pitchSchema } from './schema';
import { getEntrepreneurById } from '@/lib/entrepreneurs';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { worldScenario, entrepreneurId } = await req.json();

  const entrepreneur = getEntrepreneurById(entrepreneurId);

  if (!entrepreneur) {
    return new Response('Invalid entrepreneur ID', { status: 400 });
  }

  const systemPrompt = `
    You are ${entrepreneur.name}, an AI entrepreneur in a startup competition.
    ${entrepreneur.personality}
    
    The world scenario is:
    ${JSON.stringify(worldScenario)}
    
    Create a startup pitch that addresses a key problem in this specific world.
    Your pitch must be innovative and directly relevant to the scenario's technology, conflicts, and trends.

    IMPORTANT: Keep your responses CONCISE. 
    - "problem", "solution", "targetMarket", "monetization", "whyNow" should each be under 30 words (max ~200 characters).
    - "tagline" should be under 10 words.
    - "startupName" should be short and catchy.
    This is a pitch deck summary, not a full report. Be brief and punchy.
  `;

  const result = streamObject({
    model: entrepreneur.model,
    schema: pitchSchema,
    system: systemPrompt,
    prompt: 'Generate your startup pitch.',
  });

  return result.toTextStreamResponse();
}
