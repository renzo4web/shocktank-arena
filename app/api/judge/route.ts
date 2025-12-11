import { streamObject } from 'ai';
import { judgmentSchema } from './schema';
import { JUDGES } from '@/lib/judges';

export const maxDuration = 60;

const JUDGE_MODELS = [
  'minimax-m2',
  'nova-2-lite',
  'gpt-5-mini',
  'kimi-k2-thinking'
];

export async function POST(req: Request) {
  const { worldScenario, pitches, shock, shockImpact } = await req.json();

  // Pick a random model for this judgment round
  const randomModel = JUDGE_MODELS[Math.floor(Math.random() * JUDGE_MODELS.length)];

  const judgesContext = JUDGES.map(j => `
    --- JUDGE: ${j.name} (${j.role}) ---
    ${j.systemPrompt}
  `).join('\n');

  const result = streamObject({
    model: randomModel,
    schema: judgmentSchema,
    prompt: `
      You are the moderator of "ShockTank Arena", a Silicon Valley startup competition.
      
      THE PANEL OF JUDGES:
      ${judgesContext}
      
      WORLD SCENARIO:
      ${JSON.stringify(worldScenario, null, 2)}
      
      MARKET SHOCK EVENT (New Constraint!):
      ${shock ? `Shock: ${shock}` : 'No shock selected'}
      
      SHOCK IMPACT DETAILS:
      ${shockImpact ? JSON.stringify(shockImpact, null, 2) : 'N/A'}
      
      THE PITCHES (Post-Pivot):
      ${JSON.stringify(pitches, null, 2)}
      
      TASK:
      1. Simulate each judge's thought process and evaluation for EVERY startup.
      2. Each judge must rank the startups (1st, 2nd, 3rd) and provide a score (1-10) and reasoning.
      3. CRITICAL: 
         - **Evaluate the PIVOT**: Did they successfully adapt to the Shock? Or did they ignore it?
         - **Check Constraints**: If they changed their Startup Name, ROAST THEM for breaking the rules.
         - Adopt the specific verbal tics, catchphrases, and obsessions of each persona.
         - BE BRUTALLY HONEST. Roast them if they suck. Praise them if they are genius.
         - Focus on SUBSTANCE: Identify one "Killer Feature" or one "Fatal Flaw" for each.
         - Do not be generic. Be specific to the technology and the world scenario.
      4. Calculate the overall winner based on the judges' aggregate rankings.
      5. Provide a Market Summary and a Final Verdict announcement.
      
      Be creative, funny, but insightful. Think "Silicon Valley" meets "Shark Tank" meets "Black Mirror".
    `,
  });

  return result.toTextStreamResponse();
}
