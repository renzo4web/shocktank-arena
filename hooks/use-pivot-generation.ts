import { experimental_useObject as useObject } from '@ai-sdk/react';
import { pivotSchema } from '@/app/api/pivot/schema';
import { ENTREPRENEURS } from '@/lib/entrepreneurs';

export function usePivotGeneration() {
    const { object: pivot1, submit: submitPivot1, isLoading: isPivot1Loading } = useObject({
        api: '/api/pivot',
        schema: pivotSchema,
    });

    const { object: pivot2, submit: submitPivot2, isLoading: isPivot2Loading } = useObject({
        api: '/api/pivot',
        schema: pivotSchema,
    });

    const { object: pivot3, submit: submitPivot3, isLoading: isPivot3Loading } = useObject({
        api: '/api/pivot',
        schema: pivotSchema,
    });

    const generatePivots = (worldScenario: any, shock: any, shockImpact: any, currentPitches: any[]) => {
        // Only generate if we have the corresponding pitch
        const pitch1 = currentPitches.find(p => p.entrepreneur.id === 'entrepreneur-1');
        const pitch2 = currentPitches.find(p => p.entrepreneur.id === 'entrepreneur-2');
        const pitch3 = currentPitches.find(p => p.entrepreneur.id === 'entrepreneur-3');

        if (pitch1?.object) {
            submitPivot1({
                entrepreneur: ENTREPRENEURS[0],
                originalPitch: pitch1.object,
                shock,
                worldScenario,
                shockImpact
            });
        }

        if (pitch2?.object) {
            submitPivot2({
                entrepreneur: ENTREPRENEURS[1],
                originalPitch: pitch2.object,
                shock,
                worldScenario,
                shockImpact
            });
        }

        if (pitch3?.object) {
            submitPivot3({
                entrepreneur: ENTREPRENEURS[2],
                originalPitch: pitch3.object,
                shock,
                worldScenario,
                shockImpact
            });
        }
    };

    return {
        pivots: [
            { entrepreneur: ENTREPRENEURS[0], object: pivot1, isLoading: isPivot1Loading },
            { entrepreneur: ENTREPRENEURS[1], object: pivot2, isLoading: isPivot2Loading },
            { entrepreneur: ENTREPRENEURS[2], object: pivot3, isLoading: isPivot3Loading },
        ],
        generatePivots,
    };
}
