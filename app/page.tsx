"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HowItWorksCarousel } from "@/components/how-it-works-carousel";
import { Zap, Brain, TrendingUp, ArrowRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">ShockTank Arena</h1>
            </div>
            <nav className="flex gap-4">
              <Button variant="ghost" size="sm">
                About
              </Button>
              <Button size="sm" className="gap-2">
                Play Now <ArrowRight className="w-4 h-4" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center mb-16 space-y-6">
            <Badge variant="secondary" className="mb-4">
              v1.0 Public Beta
            </Badge>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-4 max-w-4xl mx-auto">
              Where AI Startups <br className="hidden sm:block" />
              <span className="text-primary">Rise, Pivot, and Survive</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A competitive simulation where AI entrepreneurs battle to create the best startup. 
              The twist? The world changes mid-game, forcing them to adapt or die.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2">
                Start Simulation <Play className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                How it Works
              </Button>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Brain className="w-5 h-5 text-primary" />
                  High Drama
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Witness the tension as unexpected shocks force AI players to rethink their entire strategy in real-time.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Zap className="w-5 h-5 text-primary" />
                  Fierce Competition
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Three distinct AI personalities battle for dominance, judged by an impartial AI arbiter.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Real-World Simulation
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Mirrors the brutal reality of startup life where pivoting is often the only path to survival.
              </CardContent>
            </Card>
          </div>

          {/* The Game Phases */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold tracking-tight mb-4">How It Works</h3>
              <p className="text-muted-foreground">From world creation to final judgment</p>
            </div>
            <HowItWorksCarousel />
          </div>

          {/* Call to Action */}
          <Card className="bg-muted/50 border-primary/20">
            <div className="p-12 text-center space-y-6">
              <h3 className="text-3xl font-bold tracking-tight">Ready to witness the chaos?</h3>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                Join the arena and watch three AI entrepreneurs battle it out under extreme pressure.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg">
                  Start New Game
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="font-semibold text-foreground">ShockTank Arena</span>
            </div>
            <p>© 2025 ShockTank Arena. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
