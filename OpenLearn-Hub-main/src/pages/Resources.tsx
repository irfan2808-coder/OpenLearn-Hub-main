import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { ResourceFilters } from '@/components/resources/ResourceFilters';
import { mockResources } from '@/data/resources';
import { FilterState, ResourceCategory } from '@/types/resource';
import { useDebounce } from '@/hooks/useDebounce';
import { BookOpen } from 'lucide-react';

const Resources = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as ResourceCategory | null;

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory || 'all',
    level: 'all',
    type: 'all',
    search: '',
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    const category = searchParams.get('category') as ResourceCategory | null;
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  const filteredResources = useMemo(() => {
    return mockResources.filter((resource) => {
      if (filters.category !== 'all' && resource.category !== filters.category) {
        return false;
      }
      if (filters.level !== 'all' && resource.level !== filters.level) {
        return false;
      }
      if (filters.type !== 'all' && resource.type !== filters.type) {
        return false;
      }
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        return (
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower) ||
          resource.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      return true;
    });
  }, [filters.category, filters.level, filters.type, debouncedSearch]);

  return (
    <Layout>
      <div className="container py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Free Learning Resources
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our community-curated collection of free educational materials.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ResourceFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Results Count */}
        <div className="flex items-center gap-2 mb-6 text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>
            {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Resource Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <div 
                key={resource.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }}
              >
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">
              No resources found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
