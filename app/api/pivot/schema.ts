import { z } from 'zod';
import { pitchSchema } from '../pitches/schema';

export const pivotSchema = pitchSchema.extend({
    pivotReasoning: z.string().describe('A short explanation of how the startup adapted to the shock (max 2 sentences).'),
});
