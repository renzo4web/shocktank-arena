import { streamObject } from 'ai';
import { pivotSchema } from './schema';

export async function POST(req: Request) {
    const { entrepreneur, originalPitch, shock, worldScenario, shockImpact } = await req.json();

    const result = streamObject({
        model: 'anthropic/claude-sonnet-4.5',
        system: `You are playing the role of ${entrepreneur.name}, a ${entrepreneur.role}.
             Your startup has just been hit by a major market shock.
             You must PIVOT your strategy to survive and thrive in this new world.
             
             CRITICAL RULES:
             1. DO NOT change your startup name. You are pivoting the existing company.
             2. DO NOT completely abandon your vision. Adapt it.
             3. Explain your pivot reasoning clearly.
             
             Your Personality: ${entrepreneur.bio}
             `,
        prompt: `
      Current World Scenario:
      ${JSON.stringify(worldScenario)}

      The Shock Event:
      ${JSON.stringify(shock)}
      
      Shock Impact:
      ${JSON.stringify(shockImpact)}

      Your Original Pitch:
      ${JSON.stringify(originalPitch)}

      GENERATE YOUR PIVOT NOW.
    `,
        schema: pivotSchema,
        schemaName: 'PivotPitch',
        schemaDescription: 'The pivoted startup pitch adapted to the shock',
    });

    return result.toTextStreamResponse();
}
