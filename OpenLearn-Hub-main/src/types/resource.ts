export type ResourceCategory = 
  | 'technology' 
  | 'exams' 
  | 'health' 
  | 'skills' 
  | 'community';

export type ResourceLevel = 'beginner' | 'intermediate' | 'advanced';

export type ResourceType = 'video' | 'pdf' | 'website' | 'article' | 'course';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  level: ResourceLevel;
  type: ResourceType;
  url: string;
  tags: string[];
  contributor?: string;
  createdAt: string;
  views?: number;
}

export interface FilterState {
  category: ResourceCategory | 'all';
  level: ResourceLevel | 'all';
  type: ResourceType | 'all';
  search: string;
}
