import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Lightbulb, Users, DollarSign, Rocket } from 'lucide-react';
import { Pitch } from '@/app/api/pitches/schema';
import { Entrepreneur } from '@/lib/entrepreneurs';

interface PitchCardProps {
  entrepreneur: Entrepreneur;
  pitch: Partial<Pitch> | undefined;
  isLoading: boolean;
}

export function PitchCard({ entrepreneur, pitch, isLoading }: PitchCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge className={entrepreneur.color + " text-white"}>{entrepreneur.name}</Badge>
          <span className="text-xs text-muted-foreground">{entrepreneur.model}</span>
        </div>
        <CardTitle className="text-xl">
          {pitch?.startupName || (isLoading ? 'Brainstorming...' : 'Waiting...')}
        </CardTitle>
        {pitch?.tagline && (
          <p className="text-sm text-muted-foreground italic">&ldquo;{pitch.tagline}&rdquo;</p>
        )}
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {isLoading && !pitch && (
          <div className="flex justify-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
        
        {pitch && (
          <>
            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-1">
                <Target className="w-4 h-4" /> Problem
              </h4>
              <p className="text-sm text-muted-foreground">{pitch.problem}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-1">
                <Lightbulb className="w-4 h-4" /> Solution
              </h4>
              <p className="text-sm text-muted-foreground">{pitch.solution}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-1">
                <Users className="w-4 h-4" /> Target Market
              </h4>
              <p className="text-sm text-muted-foreground">{pitch.targetMarket}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4" /> Monetization
              </h4>
              <p className="text-sm text-muted-foreground">{pitch.monetization}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-1">
                <Rocket className="w-4 h-4" /> Why Now?
              </h4>
              <p className="text-sm text-muted-foreground">{pitch.whyNow}</p>
            </div>
          </>
        )}
        
        {/* Check for pivotReasoning property which might exist if the pitch object is actually a PivotPitch */}
        {pitch && 'pivotReasoning' in pitch && (pitch as any).pivotReasoning && (
             <div className="mt-4 pt-4 border-t border-dashed border-primary/30 bg-primary/5 -mx-6 px-6 pb-2">
                <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4" /> Pivot Strategy
                </h4>
                <p className="text-sm text-primary/80 font-medium italic">
                    "{(pitch as any).pivotReasoning}"
                </p>
            </div>
        )}
      </CardContent>
    </Card>

  );
}
