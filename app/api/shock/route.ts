import { streamObject } from 'ai';
import { shockSchema } from './schema';

export async function POST(req: Request) {
    const { worldScenario, selectedShock } = await req.json();

    const result = streamObject({
        model: 'anthropic/claude-sonnet-4.5',
        system: 'You are the World Builder AI for a high-stakes startup simulation. Your job is to take an existing world scenario and a specific "Shock" event, and describe how the world has drastically changed. Be dramatic but logical.',
        prompt: `
      Current World Scenario:
      ${JSON.stringify(worldScenario, null, 2)}

      The Shock Event:
      ${selectedShock}

      Describe how this shock impacts the world. Focus on:
      1. Immediate chaos or structural changes.
      2. How the core technology, social conflict, or cultural trend from the original scenario are twisted or amplified.
      3. New harsh realities for businesses.
    `,
        schema: shockSchema,
        schemaName: 'ShockImpact',
        schemaDescription: 'The impact of a shock event on the world scenario',
        mode: 'json',
    });

    return result.toTextStreamResponse();
}
