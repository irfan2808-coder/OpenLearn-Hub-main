import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FilterState, ResourceCategory, ResourceLevel, ResourceType } from '@/types/resource';
import { categories, levels, resourceTypes } from '@/data/resources';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/Input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface ResourceFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function ResourceFilters({ filters, onFilterChange }: ResourceFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ 
      ...filters, 
      category: value as ResourceCategory | 'all' 
    });
  };

  const handleLevelChange = (value: string) => {
    onFilterChange({ 
      ...filters, 
      level: value as ResourceLevel | 'all' 
    });
  };

  const handleTypeChange = (value: string) => {
    onFilterChange({ 
      ...filters, 
      type: value as ResourceType | 'all' 
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      level: 'all',
      type: 'all',
      search: '',
    });
  };

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.level !== 'all' || 
    filters.type !== 'all' || 
    filters.search !== '';

  return (
    
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? 'default' : 'outline'}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="shrink-0"
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Dropdowns */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 p-4 bg-muted/50 rounded-xl animate-fade-in">
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.level} onValueChange={handleLevelChange}>
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {resourceTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
    
  );
}
