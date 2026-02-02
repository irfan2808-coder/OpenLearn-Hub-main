import { Ban, Gift, Lock, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Gift,
    title: 'Forever Free',
    description: 'No hidden costs, no premium tiers. Every resource is completely free.',
  },
  {
    icon: Ban,
    title: 'No Ads Ever',
    description: 'Clean, distraction-free learning experience without advertisements.',
  },
  {
    icon: Lock,
    title: 'No Sign-up Required',
    description: 'Access all resources instantly as a guest. No barriers to learning.',
  },
  {
    icon: Sparkles,
    title: 'Community Curated',
    description: 'Resources vetted and shared by passionate learners like you.',
  },
];

export function MissionSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Our Commitment to{' '}
            <span className="text-primary">Free Education</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe quality education should be accessible to everyone, 
            regardless of their financial situation. That's why LearnFree 
            will always remain 100% free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center p-6 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
