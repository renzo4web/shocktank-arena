'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { Text } from '@/components/retroui/Text';

const worldScenarioSchema = z.object({
  technology: z.string(),
  socialConflict: z.string(),
  culturalTrend: z.string(),
  description: z.string(),
});

export default function ArenaPage() {
  const { object : worldScenario, submit, isLoading, error } = useObject({
    api: '/api/arena',
    schema: worldScenarioSchema,
  });

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
            <Badge>World Builder</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Generate Button */}
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
              onClick={() => submit('Generate a new world scenario')}
              disabled={isLoading || !!worldScenario}
              className="gap-2 m-auto"
            >
              {isLoading ? 'Building World...' : 'Generate World Scenario'}
              <Zap className="w-4 h-4" />
            </Button>
          </div>

          {/* World Display */}
          {worldScenario && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
                    🌍 World Scenario Generated
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Text className="font-sans text-base">
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

                  <div className="text-center pt-4">
                    <Button size="lg" className='m-auto' >
                      Start Entrepreneur Phase
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !worldScenario && !error && (
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

          {/* Error State */}
          {error && (
            <Card className="border-destructive bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-destructive flex items-center justify-center text-white text-xs font-bold">!</div>
                  Error Generating World
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-destructive">
                  {error instanceof Error ? error.message : String(error)}
                </p>
                <Button
                  onClick={() => submit('Generate a new world scenario')}
                  className="gap-2 w-full m-auto"
                >
                  Try Again
                  <Zap className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}