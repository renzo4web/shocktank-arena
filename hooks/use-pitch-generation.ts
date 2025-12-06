import { experimental_useObject as useObject } from '@ai-sdk/react';
import { pitchSchema } from '@/app/api/pitches/schema';
import { ENTREPRENEURS } from '@/lib/entrepreneurs';

export function usePitchGeneration() {
  const { object: pitch1, submit: submitPitch1, isLoading: isPitch1Loading } = useObject({
    api: '/api/pitches',
    schema: pitchSchema,
  });

  const { object: pitch2, submit: submitPitch2, isLoading: isPitch2Loading } = useObject({
    api: '/api/pitches',
    schema: pitchSchema,
  });

  const { object: pitch3, submit: submitPitch3, isLoading: isPitch3Loading } = useObject({
    api: '/api/pitches',
    schema: pitchSchema,
  });

  const generatePitches = (worldScenario: any) => {
    submitPitch1({ worldScenario, entrepreneurId: 'entrepreneur-1' });
    submitPitch2({ worldScenario, entrepreneurId: 'entrepreneur-2' });
    submitPitch3({ worldScenario, entrepreneurId: 'entrepreneur-3' });
  };

  return {
    pitches: [
      { entrepreneur: ENTREPRENEURS[0], object: pitch1, isLoading: isPitch1Loading },
      { entrepreneur: ENTREPRENEURS[1], object: pitch2, isLoading: isPitch2Loading },
      { entrepreneur: ENTREPRENEURS[2], object: pitch3, isLoading: isPitch3Loading },
    ],
    generatePitches,
  };
}
