import { Link } from 'react-router-dom';
import { ArrowRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 gradient-hero">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary mb-6">
            <Share2 className="h-4 w-4" />
            Join Our Community
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Have a Free Resource to Share?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help fellow learners by contributing quality educational resources. 
            Every contribution helps someone learn something new.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary shadow-button text-base font-semibold">
              <Link to="/contribute">
                Contribute a Resource
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base font-semibold bg-background/80 backdrop-blur-sm">
              <Link to="/resources">
                Browse Resources
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
