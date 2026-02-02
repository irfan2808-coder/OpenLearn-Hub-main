import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Heart className="h-4 w-4 fill-current" />
            100% Free, Forever
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Learn Anything,{' '}
            <span className="text-primary">Completely Free</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Access thousands of curated educational resources shared by our community. 
            No subscriptions, no ads, no barriers to learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="lg" className="gradient-primary shadow-button text-base font-semibold">
              <Link to="/resources">
                Explore Free Resources
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base font-semibold">
              <Link to="/contribute">
                Share a Resource
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="font-display font-bold text-2xl">500+</div>
              <div className="text-sm text-muted-foreground">Resources</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div className="font-display font-bold text-2xl">10K+</div>
              <div className="text-sm text-muted-foreground">Learners</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Heart className="h-6 w-6 text-destructive" />
              </div>
              <div className="font-display font-bold text-2xl">100%</div>
              <div className="text-sm text-muted-foreground">Free</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
