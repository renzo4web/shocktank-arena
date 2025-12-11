'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Zap, Users, TrendingUp, ArrowLeft, Trophy, Star, Award, BarChart3, ArrowRight, AlertTriangle, Lock, RefreshCw, Smartphone, Globe, Activity } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { Text } from '@/components/retroui/Text';
import { useState } from 'react';
import { PitchCard } from '@/components/pitch-card';
import { usePitchGeneration } from '@/hooks/use-pitch-generation';
import { usePivotGeneration } from '@/hooks/use-pivot-generation';
import { judgmentSchema } from '../api/judge/schema';
import { shockSchema } from '../api/shock/schema';
import { ENTREPRENEURS } from '@/lib/entrepreneurs';
import { JUDGES, JudgePersona } from '@/lib/judges';
import { Badge } from '@/components/ui/badge';

const SHOCK_OPTIONS = [
   { 
      id: 'crash', 
      title: 'Global Market Crash', 
      description: 'The financial system collapses, funding dries up.',
      icon: TrendingUp // actually trending down logically but visual metaphor
   },
   { 
      id: 'reg-hammer', 
      title: 'Regulatory Hammer', 
      description: 'Governments impose strict, suffocating bans.',
      icon: Lock 
   },
   { 
      id: 'tech-breakthrough', 
      title: 'AGI Breakthrough', 
      description: 'Competitors just got 1000x smarter overnight.',
      icon: Zap 
   }
];

const worldScenarioSchema = z.object({
  technology: z.string(),
  socialConflict: z.string(),
  culturalTrend: z.string(),
  description: z.string(),
});


export default function ArenaPage() {
  const [phase, setPhase] = useState<'world' | 'pitches' | 'shock' | 'pivot' | 'judgment'>('world');
  const [selectedShock, setSelectedShock] = useState<string | null>(null);


  const { object: worldScenario, submit: submitWorld, isLoading: isWorldLoading, error: worldError } = useObject({
    api: '/api/arena',
    schema: worldScenarioSchema,
  });

  const { pitches, generatePitches } = usePitchGeneration();
  const { pivots, generatePivots } = usePivotGeneration();
  
  const { object: judgment, submit: submitJudgment, isLoading: isJudgmentLoading } = useObject({
    api: '/api/judge',
    schema: judgmentSchema,
  });

  const { object: shockImpact, submit: submitShock, isLoading: isShockLoading } = useObject({
    api: '/api/shock',
    schema: shockSchema,
  });
  
  const isGeneratingWorld = isWorldLoading && !worldScenario && !worldError;

  // Check if all pitches are finished generating
  const arePitchesReady = pitches.length === 3 && pitches.every(p => !p.isLoading && p.object);
  
  // Check if all pivots are finished
  const arePivotsReady = pivots.length === 3 && pivots.every(p => !p.isLoading && p.object);

  const handleSimulatePitches = () => {
    if (!worldScenario) return;
    setPhase('pitches');
    generatePitches(worldScenario);
  };

  const handleSelectShock = (shockTitle: string) => {
     if (!worldScenario) return;
     setSelectedShock(shockTitle);
     setPhase('shock');
     submitShock({ worldScenario, selectedShock: shockTitle });
      
      // Scroll to shock section after a short delay
     setTimeout(() => {
        const shockSection = document.getElementById('shock-section');
        if (shockSection) {
            shockSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };

  const handleTriggerPivot = () => {
    if (!worldScenario || !shockImpact || !selectedShock) return;

    setPhase('pivot');
    generatePivots(worldScenario, selectedShock, shockImpact, pitches);
    
    // Smooth scroll to pivot section
    setTimeout(() => {
        const pivotSection = document.getElementById('pivot-section');
        if (pivotSection) {
            pivotSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };
  
  const handleJudgePitches = () => {
    if (!worldScenario) return;
    
    // Use PIVOTS if available, otherwise pitches (though flow enforces pivots now)
    const sourcePitches = arePivotsReady ? pivots : pitches;

    // Extract completed pitches/pivots
    const validPitches = sourcePitches
      .filter(p => p.object)
      .map(p => ({
        entrepreneurId: p.entrepreneur.id,
        pitch: p.object
      }));

    if (validPitches.length < 3) return; // simple check

    setPhase('judgment');
    submitJudgment({ 
        worldScenario, 
        pitches: validPitches, // passing pivots here
        shock: selectedShock, // pass shock context
        shockImpact // pass shock impact context
    });
    
    // Smooth scroll to the verdict section
    setTimeout(() => {
        const verdictSection = document.getElementById('verdict-section');
        if (verdictSection) {
            verdictSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
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
                <Card className='w-full'>
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
          {phase !== 'world' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
              
              {/* Show Pivot Button ONLY if we haven't started pivoting yet */}
              {arePitchesReady && phase === 'pitches' && (
                  <div className="flex flex-col items-center gap-4 pt-8 animate-in fade-in zoom-in duration-500">
                     <div className="flex flex-col items-center gap-6 p-8 bg-muted/30 rounded-xl border-2 border-dashed">
                        <div className="text-center space-y-2">
                           <h3 className="text-xl font-bold">Inject Chaos into the System</h3>
                           <p className="text-muted-foreground max-w-md">
                              The startup world is unpredictable. Introduce a "Shock" event to test their resilience.
                           </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                           {SHOCK_OPTIONS.map((shock) => (
                              <Button
                                 key={shock.id}
                                 variant="outline"
                                 className="h-auto py-6 px-4 flex flex-col gap-2 hover:bg-destructive/10 hover:border-destructive/50 transition-all text-wrap text-center"
                                 onClick={() => handleSelectShock(shock.title)}
                                 disabled={isShockLoading}
                              >
                                 <shock.icon className="w-8 h-8 text-destructive mb-1" />
                                 <span className="font-bold text-lg">{shock.title}</span>
                                 <span className="text-xs text-muted-foreground font-normal">{shock.description}</span>
                              </Button>
                           ))}
                        </div>
                     </div>
                  </div>
              )}
              {!arePitchesReady && pitches.some(p => p.isLoading) && (
                 <div className="flex justify-center pt-8">
                    <p className="text-sm text-muted-foreground animate-pulse flex items-center gap-2">
                       <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" />
                       Waiting for all entrepreneurs to finish their pitches...
                    </p>
                 </div>
              )}
            </div>
          )}

          {/* Phase 3: The Shock */}
          {(phase === 'shock' || phase === 'pivot' || phase === 'judgment') && (
             <div id="shock-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 scroll-mt-24 pt-8 border-t-2 border-dashed">
                <div className="text-center">
                   <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive">
                      <Zap className="w-8 h-8" />
                   </div>
                   <h2 className="text-3xl font-bold tracking-tight mb-4 text-destructive">
                      Market Shock!
                   </h2>
                   
                    {isShockLoading && !shockImpact && (
                        <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin w-6 h-6 border-2 border-destructive border-t-transparent rounded-full"></div>
                            <p className="text-sm text-muted-foreground">Destabilizing the economy...</p>
                        </div>
                    )}
                </div>

                {shockImpact && (
                   <Card className="border-destructive/50 bg-destructive/5 shadow-lg w-full">
                      <CardHeader>
                         <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                            New World Order
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                         <p className="text-lg font-medium text-center max-w-3xl mx-auto leading-relaxed">
                            {shockImpact.impactDescription}
                         </p>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="bg-background/80 p-4 rounded-lg border border-destructive/20">
                               <h4 className="font-bold text-destructive mb-2 flex items-center gap-2">
                                  <TrendingUp className="w-4 h-4 rotate-180" />
                                  Market Conditions
                               </h4>
                               <p className="text-sm text-muted-foreground">{shockImpact.changedMarketConditions}</p>
                            </div>
                            <div className="bg-background/80 p-4 rounded-lg border border-destructive/20">
                               <h4 className="font-bold text-destructive mb-2 flex items-center gap-2">
                                  <Lock className="w-4 h-4" />
                                  New Constraints
                               </h4>
                               <p className="text-sm text-muted-foreground">{shockImpact.newConstraints}</p>
                            </div>
                         </div>

                         {phase === 'shock' && (
                            <div className="flex justify-center pt-6">
                               <Button 
                                  size="lg" 
                                  className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={handleTriggerPivot}
                               >
                                  <RefreshCw className="w-4 h-4" />
                                  Force Entrepreneurs to Pivot
                               </Button>
                            </div>
                         )}
                      </CardContent>
                   </Card>
                )}
             </div>
          )}

          {/* Phase 4: The Pivot */}
          {(phase === 'pivot' || phase === 'judgment') && (
             <div id="pivot-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 scroll-mt-24 pt-8 border-t-2 border-dashed">
                 <div className="text-center">
                   <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                      <RefreshCw className="w-8 h-8" />
                   </div>
                   <h2 className="text-3xl font-bold tracking-tight mb-4">
                      The Pivot
                   </h2>
                   <p className="text-muted-foreground mb-6">
                      Entrepreneurs must now adapt their strategy to survive the {selectedShock}.
                   </p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {pivots.map((pivotData) => (
                      <PitchCard
                        key={pivotData.entrepreneur.id}
                        entrepreneur={pivotData.entrepreneur}
                        pitch={pivotData.object as any} // cast to any to avoid strict type checks since we extended it
                        isLoading={pivotData.isLoading}
                      />
                    ))}
                 </div>

                  {arePivotsReady && phase === 'pivot' && (
                      <div className="flex justify-center pt-8 animate-in fade-in zoom-in duration-500">
                          <Button 
                            size="lg" 
                            onClick={handleJudgePitches}
                            disabled={isJudgmentLoading} 
                            className="gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold border-2 border-yellow-950 shadow-[4px_4px_0px_0px_rgba(66,32,6,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(66,32,6,1)] transition-all scale-125"
                          >
                            {isJudgmentLoading ? (
                                <>
                                    Judging...
                                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                                </>
                            ) : (
                                <>
                                    Judge the Winner
                                    <Trophy className="w-4 h-4 mb-0.5" />
                                </>
                            )}
                          </Button>
                      </div>
                  )}
             </div>
          )}

          {/* Phase 3: Judgment */}
          {phase === 'judgment' && (
            <div id="verdict-section" className="space-y-8 w-full max-w-[90rem] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 scroll-mt-24">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600">
                  <Trophy className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  The Panel's Verdict
                </h2>
                <p className="text-muted-foreground mb-6">
                  The Silicon Valley titans have spoken. Here is how they voted.
                </p>
                {isJudgmentLoading && !judgment && (
                   <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
                      <p className="text-sm text-muted-foreground">Crunching the numbers...</p>
                   </div>
                )}
              </div>

              {judgment && (
                 <div className="space-y-12">
                    {/* Market Summary */}
                    <Card className="bg-muted/30">
                       <CardContent className="pt-6">
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                             <BarChart3 className="w-4 h-4" />
                             Market Consensus
                          </h3>
                          <p className="text-muted-foreground">{judgment.marketSummary}</p>
                       </CardContent>
                    </Card>

                    {/* Judges Grid */}
                    {judgment.judgeEvaluations && judgment.judgeEvaluations.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {judgment.judgeEvaluations.map((evalData, index) => {
                                if (!evalData || !evalData.judgeId) return null;
                                let judgePersona = JUDGES.find(j => j.id === evalData.judgeId);
                                
                                // Fallback: try matching by name if ID lookup fails
                                if (!judgePersona && evalData.judgeName) {
                                    const safeName = evalData.judgeName.toLowerCase();
                                    judgePersona = JUDGES.find(j => j.name.toLowerCase() === safeName || safeName.includes(j.name.toLowerCase().split(' ')[0]));
                                }

                                if (!judgePersona) return null;

                                return (
                                    <div key={evalData.judgeId} className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 150}ms` }}>
                                        {/* Judge Profile Header */}
                                        <div className={`p-4 rounded-xl border-l-4 shadow-sm bg-card flex items-center gap-4 transition-all hover:translate-x-1`} style={{ borderLeftColor: judgePersona.color.replace('bg-', '') }}>
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-inner ${judgePersona.color} text-white ring-2 ring-background`}>
                                                {judgePersona.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg leading-tight">{judgePersona.name}</h4>
                                                <p className="text-sm text-muted-foreground font-medium">{judgePersona.role}</p>
                                            </div>
                                        </div>

                                        {/* Judge's Picks Stack */}
                                        <div className="space-y-3 pl-2 border-l-2 border-dashed border-muted/50 ml-6 pb-2">
                                            {evalData.rankings
                                                ?.filter((r): r is NonNullable<typeof r> => !!r && typeof r.rank === 'number')
                                                .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
                                                .map((ranking) => {
                                                    const entrepreneur = ENTREPRENEURS.find(e => e.id === ranking.entrepreneurId);
                                                    if (!entrepreneur) return null;
                                                    const isWinner = ranking.rank === 1;

                                                    return (
                                                        <Dialog key={ranking.entrepreneurId}>
                                                            <DialogTrigger asChild>
                                                                <Card className={`relative ml-4 overflow-hidden transition-all cursor-pointer group hover:scale-[1.02] hover:shadow-md ${isWinner ? 'border-yellow-500/50 bg-yellow-50/10' : 'hover:border-primary/20'}`}>
                                                                    {isWinner && (
                                                                        <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-bl from-yellow-400 to-amber-500 text-[10px] font-black text-white shadow-sm rounded-bl-xl z-10">
                                                                            #1 PICK
                                                                        </div>
                                                                    )}
                                                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${isWinner ? 'bg-yellow-500' : 'bg-transparent group-hover:bg-primary/20'} transition-colors`} />
                                                                    
                                                                    <CardContent className="p-4 pt-5">
                                                                        <div className="flex justify-between items-start mb-3 gap-2">
                                                                           <div className="flex items-center gap-2">
                                                                                <Badge variant={isWinner ? 'solid' : 'surface'} className={`mb-0 pointer-events-none ${isWinner ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-0' : ''}`}>
                                                                                    #{ranking.rank} {entrepreneur.name}
                                                                                </Badge>
                                                                                {isWinner && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 animate-pulse" />}
                                                                           </div>
                                                                            <span className={`font-mono text-sm font-black ${isWinner ? 'text-yellow-600' : 'text-muted-foreground'}`}>{ranking.score}/10</span>
                                                                        </div>
                                                                        <div className="relative">
                                                                             <p className="text-sm text-muted-foreground/80 italic line-clamp-2 pl-3 border-l-2 border-primary/20 font-serif">
                                                                                "{ranking.reasoning}"
                                                                            </p>
                                                                        </div>
                                                                        <div className="mt-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                            <span className="text-[10px] text-primary/60 font-bold uppercase tracking-widest flex items-center gap-1">
                                                                                Read Full Critique <ArrowRight className="w-3 h-3" />
                                                                            </span>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-xl sm:max-w-2xl border-2">
                                                                <DialogHeader className="pb-4 border-b">
                                                                    <DialogTitle className="flex items-center gap-4">
                                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-3xl shadow-md ${judgePersona.color} text-white`}>
                                                                            {judgePersona.avatar}
                                                                        </div>
                                                                        <div className="flex flex-col items-start gap-1">
                                                                            <span className="font-bold text-xl">{judgePersona.name} roasts {entrepreneur.name}</span>
                                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                                <Badge variant="outline" className="font-normal">{entrepreneur.model}</Badge>
                                                                                <span>•</span>
                                                                                <span>{entrepreneur.name}</span>
                                                                            </div>
                                                                        </div>
                                                                    </DialogTitle>
                                                                </DialogHeader>
                                                                
                                                                <div className="space-y-8 p-6">
                                                                    {/* Hero Stats */}
                                                                    <div className="flex items-center justify-between p-6 bg-secondary/20 rounded-xl border border-secondary/40">
                                                                        <div className="text-center w-full border-r border-border/50">
                                                                            <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Rank</div>
                                                                            <div className={`text-4xl font-black ${isWinner ? 'text-yellow-500' : ''}`}>#{ranking.rank}</div>
                                                                        </div>
                                                                        <div className="text-center w-full">
                                                                            <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Score</div>
                                                                            <div className="text-4xl font-black">{ranking.score}<span className="text-lg text-muted-foreground/50 font-medium">/10</span></div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {/* The Feedback */}
                                                                    <div className="relative bg-muted/30 p-8 rounded-xl">
                                                                        <div className="absolute top-0 left-0 text-7xl text-primary/10 font-serif leading-none -translate-x-2 -translate-y-4">“</div>
                                                                        <p className="relative z-10 text-lg md:text-xl font-medium leading-relaxed text-foreground/90 whitespace-pre-wrap font-serif">
                                                                            {ranking.reasoning}
                                                                        </p>
                                                                        <div className="absolute bottom-0 right-0 text-7xl text-primary/10 font-serif leading-none translate-x-2 translate-y-8">”</div>
                                                                    </div>

                                                                    {isWinner && (
                                                                        <div className="flex items-center justify-center gap-2 text-yellow-600 bg-yellow-50 py-2 rounded-lg border border-yellow-200">
                                                                            <Trophy className="w-4 h-4" />
                                                                            <span className="font-bold text-sm uppercase tracking-wide">Top Selection</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    
                    {/* Final Winner Announcement */}
                    {judgment.winnerId && (
                       <div className="relative max-w-3xl mx-auto pt-8">
                          {(() => {
                              const winner = ENTREPRENEURS.find(e => e.id === judgment.winnerId);
                              const winningPitch = pitches.find(p => p.entrepreneur.id === judgment.winnerId);
                              
                              if (!winner || !winningPitch) return null;
                              
                              return (
                                 <Card className="border-2 border-yellow-500 bg-yellow-50/30 overflow-hidden relative shadow-lg">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                      <Trophy className="w-48 h-48 rotate-12" />
                                    </div>
                                   
                                   <CardHeader className="text-center pb-2 relative z-10 pt-8">
                                      <div className="flex items-center justify-center gap-2 text-yellow-700 mb-4">
                                         <Award className="w-5 h-5 fill-current" />
                                         <span className="font-bold uppercase tracking-widest text-xs">ShockTank Champion</span>
                                         <Award className="w-5 h-5 fill-current" />
                                      </div>
                                      
                                      <CardTitle className="text-4xl md:text-6xl font-black text-foreground mb-2 tracking-tight">
                                        {winningPitch.object?.startupName || "Unknown Startup"}
                                      </CardTitle>
                                      
                                      <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
                                          <span className="font-medium text-lg">by {winner.name}</span>
                                          <Badge variant="outline" className="font-normal text-xs opacity-70 bg-background/50">
                                            {winner.model}
                                          </Badge>
                                      </div>
                                   </CardHeader>
                                   
                                   <CardContent className="space-y-8 text-center relative z-10 max-w-2xl mx-auto pt-4 pb-12">
                                      <p className="text-xl font-medium text-foreground/80 leading-relaxed font-serif">
                                         "{judgment.finalVerdict}"
                                      </p>
                                      
                                      <div className="pt-2">
                                          <Button size="lg" className="w-full mx-auto md:w-auto font-bold" onClick={() => {
                                              setPhase('world');
                                              window.location.reload(); 
                                          }}>
                                              Start New Season
                                          </Button>
                                      </div>
                                   </CardContent>
                                </Card>
                              );
                          })()}
                       </div>
                    )}
                 </div>
              )}
              
             {/* Fallback loading or error states are handled above */}
            </div>
          )}        </div>
      </main>
    </div>
  );
}

