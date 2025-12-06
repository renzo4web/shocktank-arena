"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Lightbulb, AlertTriangle, RefreshCw, Trophy, type LucideIcon } from "lucide-react";

interface Step {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  details: string;
}

const steps: Step[] = [
  {
    id: "01",
    name: "World Creation",
    description: "A 'god' AI generates a unique scenario with technology, conflict, and trends.",
    icon: Globe,
    details: "The simulation begins when a powerful AI creates an entire world from scratch. This includes defining the technological landscape, ongoing conflicts between nations or corporations, emerging trends, and the economic climate. Each world is unique—sometimes it's a near-future Earth, other times a distant colony. This provides the canvas where our AI entrepreneurs will compete.",
  },
  {
    id: "02",
    name: "Initial Pitch",
    description: "Three competing AIs propose startup ideas for this world.",
    icon: Lightbulb,
    details: "Three AI entrepreneurs analyze the world they've been given. Each one identifies opportunities, gaps in the market, and unmet needs. They craft compelling startup pitches: defining the problem, the solution, the business model, and why they'll win. The pitches are presented simultaneously—no one knows what the competition is planning.",
  },
  {
    id: "03",
    name: "The Shock",
    description: "An unexpected event forces everything to change.",
    icon: AlertTriangle,
    details: "Just when the startups think they have it figured out, the world changes. A catastrophic event, a technological breakthrough, a political upheaval, or an unexpected discovery reshapes everything. This is 'The Shock'—an unpredictable twist that invalidates assumptions and forces rapid adaptation. Some ideas will become obsolete overnight; others might suddenly become essential.",
  },
  {
    id: "04",
    name: "The Pivot",
    description: "Entrepreneurs adapt their ideas to the new reality.",
    icon: RefreshCw,
    details: "Now the real test begins. Each AI entrepreneur must pivot their startup to survive in the new reality. Can they adapt their technology? Find a new market? Completely reinvent their business model? The winner isn't who had the best original idea—it's who can think on their feet, embrace change, and turn crisis into opportunity. Just like in the real startup world.",
  },
  {
    id: "05",
    name: "Judgment",
    description: "An impartial AI judge evaluates and ranks all entrepreneurs.",
    icon: Trophy,
    details: "A separate 'judge' AI evaluates all three entrepreneurs across key categories: Coherence (does the pivot make sense?), Adaptive Creativity (how clever was the adaptation?), and Clarity (is the new vision easy to understand?). Each startup receives qualitative feedback and a final ranking. The winner is crowned—but all participants learn from the competition.",
  },
];

const AUTO_PLAY_INTERVAL = 5000;

export function HowItWorksCarousel() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentStep = steps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <div className="w-full">
      <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
        How It Works
      </h3>

      {/* Step tabs - full width */}
      <div
        className="grid grid-cols-5 gap-1 sm:gap-2 mb-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`
                relative flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 rounded shadow-md border-2
                transition-all duration-300 min-h-[80px] sm:min-h-[120px]
                ${isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground hover:text-foreground hover:shadow-none hover:bg-accent/40 border-border"
                }
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
              `}
            >
              {/* Progress bar */}
              {isActive && !isPaused && (
                <div className="absolute bottom-0 left-0 h-1 bg-primary-foreground/30 rounded-b-lg sm:rounded-b-xl overflow-hidden w-full">
                  <div
                    className="h-full bg-primary-foreground animate-progress"
                    style={{ animationDuration: `${AUTO_PLAY_INTERVAL}ms` }}
                  />
                </div>
              )}

              <div
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center 
                  text-xs sm:text-sm font-bold shrink-0
                  ${isActive ? "bg-primary-foreground/20" : "bg-muted"}
                `}
              >
                {step.id}
              </div>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="font-medium text-xs sm:text-sm text-center leading-tight">
                {step.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step detail card */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <CurrentIcon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-primary font-mono text-sm sm:text-lg bg-primary/10 px-2 py-0.5 rounded">
                    {currentStep.id}
                  </span>
                  <span className="break-words">{currentStep.name}</span>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base mt-1">
                  {currentStep.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {currentStep.details}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            aria-label={`Go to step ${index + 1}`}
            className={`
              h-2 rounded-full transition-all duration-300
              ${index === activeStep
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
