import { Link } from 'react-router-dom';
import { Code, GraduationCap, Heart, Lightbulb, Users, ArrowRight } from 'lucide-react';
import { categories } from '@/data/resources';

const iconMap = {
  Code,
  GraduationCap,
  Heart,
  Lightbulb,
  Users,
};

export function CategorySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find curated learning resources across various fields, all completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            return (
              <Link
                key={category.id}
                to={`/resources?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl bg-card border border-border p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
