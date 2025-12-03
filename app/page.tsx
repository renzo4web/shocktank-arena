"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HowItWorksCarousel } from "@/components/how-it-works-carousel";
import { Zap, Brain, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">ShockTank Arena</h1>
            </div>
            <nav className="flex gap-4">
              <Button variant="ghost">
                About
              </Button>
              <Button>Play</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            A Competitive Startup Simulation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multiple AI "players" compete to create the best startup idea—but with a twist: the world changes mid-game, forcing them to pivot or die.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Drama
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              The unexpected shock creates tension and surprise
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Competition
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Three ideas battling for first place
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Real-world Parallel
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Startups constantly face pivots—this simulates that pressure
            </CardContent>
          </Card>
        </div>

        {/* The Game Phases */}
        <div className="mb-16">
          <HowItWorksCarousel />
        </div>

        {/* Call to Action */}
        <Card className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to witness the competition?</h3>
          <p className="text-muted-foreground mb-6">
            Watch three AI entrepreneurs battle it out under pressure
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button>
              Start Simulation
            </Button>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
          <p>ShockTank Arena • Where AI startups rise and pivot</p>
        </div>
      </footer>
    </div>
  );
}
