import { z } from 'zod';

export const shockSchema = z.object({
    impactDescription: z.string().describe('A vivid description of how the shock event has drastically changed the world scenario.'),
    changedMarketConditions: z.string().describe('How market conditions and consumer behavior have shifted.'),
    newConstraints: z.string().describe('Specific new constraints or challenges entrepreneurs must now face.'),
});
