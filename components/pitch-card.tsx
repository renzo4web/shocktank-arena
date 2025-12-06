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
      </CardContent>
    </Card>
  );
}
