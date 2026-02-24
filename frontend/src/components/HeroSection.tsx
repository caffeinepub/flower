import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-flowerGreen-500/10 via-botanicalPurple-500/10 to-earthWarm-500/10 border border-border/50">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-botanicalPurple-500/10 border border-botanicalPurple-500/20 text-botanicalPurple-700 dark:text-botanicalPurple-300 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Task Automation
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-flowerGreen-600 via-botanicalPurple-600 to-flowerGreen-600 bg-clip-text text-transparent leading-tight">
            Execute Tasks at Lightning Speed
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Flower harnesses artificial intelligence to automate human activities with unprecedented speed and precision. Simply describe your task, and watch it bloom into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/submit">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-flowerGreen-500 to-flowerGreen-600 hover:from-flowerGreen-600 hover:to-flowerGreen-700 text-white shadow-lg shadow-flowerGreen-500/30 transition-all duration-200 hover:scale-105"
              >
                <Zap className="h-5 w-5" />
                Submit Your First Task
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="gap-2 border-2">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
