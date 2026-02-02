import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockResources } from '@/data/resources';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { Button } from '@/components/ui/button';

export function FeaturedResources() {
  const featuredResources = mockResources.slice(0, 6);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Featured Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Popular free learning materials handpicked by our community.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/resources">
              View All Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource, index) => (
            <div 
              key={resource.id} 
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ResourceCard resource={resource} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
