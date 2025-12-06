'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Zap, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { Text } from '@/components/retroui/Text';
import { useState } from 'react';
import { PitchCard } from '@/components/pitch-card';
import { usePitchGeneration } from '@/hooks/use-pitch-generation';

const worldScenarioSchema = z.object({
  technology: z.string(),
  socialConflict: z.string(),
  culturalTrend: z.string(),
  description: z.string(),
});


export default function ArenaPage() {
  const [phase, setPhase] = useState<'world' | 'pitches'>('world');

  const { object: worldScenario, submit: submitWorld, isLoading: isWorldLoading, error: worldError } = useObject({
    api: '/api/arena',
    schema: worldScenarioSchema,
  });

  const { pitches, generatePitches } = usePitchGeneration();
  
  const isGeneratingWorld = isWorldLoading && !worldScenario && !worldError;

  const handleSimulatePitches = () => {
    if (!worldScenario) return;
    setPhase('pitches');
    generatePitches(worldScenario);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={"/"} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <Text as="h5">ShockTank Arena</Text>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Phase 1: World Generation */}
          <div className="w-full mx-auto space-y-8">
              <div className="text-center items-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Create Your World
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Generate a unique scenario where AI entrepreneurs will compete to build the next big startup.
                </p>
                <Button
                  size="lg"
                  hidden={!!worldScenario}
                  onClick={() => submitWorld('Generate a new world scenario')}
                  disabled={isWorldLoading || !!worldScenario}
                  className="gap-2 m-auto"
                >
                  {isWorldLoading ? 'Building World...' : 'Generate World Scenario'}
                  <Zap className="w-4 h-4" />
                </Button>
              </div>

              {isGeneratingWorld && (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center space-y-4">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-muted-foreground">
                        The World Builder AI is crafting your scenario...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {worldScenario && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center text-2xl">
                        🌍 World Scenario Generated
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Text className="font-sans text-base text-center">
                        {worldScenario.description}
                      </Text>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <Zap className="w-5 h-5 text-primary" />
                              Key Technology
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              {worldScenario.technology}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <Users className="w-5 h-5 text-primary" />
                              Social Conflict
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              {worldScenario.socialConflict}
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <TrendingUp className="w-5 h-5 text-primary" />
                              Cultural Trend
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Text className="font-sans text-base">
                              {worldScenario.culturalTrend}
                            </Text>
                          </CardContent>
                        </Card>
                      </div>

                      {phase === 'world' && (
                        <div className="text-center pt-4">
                          <Button size="lg" className='m-auto' onClick={handleSimulatePitches}>
                            Simulate Pitches
                            <ArrowLeft className="w-4 h-4 rotate-180 ml-2" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

          {/* Phase 2: Pitch Simulation */}
          {phase === 'pitches' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Startup Pitches
                </h2>
                <p className="text-muted-foreground mb-6">
                  Three AI entrepreneurs are brainstorming startups for this world.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {pitches.map((pitchData) => (
                  <PitchCard
                    key={pitchData.entrepreneur.id}
                    entrepreneur={pitchData.entrepreneur}
                    pitch={pitchData.object}
                    isLoading={pitchData.isLoading}
                  />
                ))}
              </div>
              
              <div className="text-center pt-8">
                 <Button variant="outline" onClick={() => {
                    setPhase('world');
                    // Ideally clear pitches here if we want to reset, but keeping them is fine too.
                 }}>
                    Back to World View
                 </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

