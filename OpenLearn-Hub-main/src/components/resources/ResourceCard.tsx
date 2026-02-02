import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Code, 
  FileText, 
  Globe, 
  GraduationCap, 
  Heart, 
  Lightbulb, 
  Play, 
  Users,
  Eye,
  ExternalLink
} from 'lucide-react';
import { Resource } from '@/types/resource';
import { levels } from '@/data/resources';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  resource: Resource;
}

const categoryIcons = {
  technology: Code,
  exams: GraduationCap,
  health: Heart,
  skills: Lightbulb,
  community: Users,
};

const typeIcons = {
  video: Play,
  pdf: FileText,
  website: Globe,
  article: BookOpen,
  course: GraduationCap,
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const CategoryIcon = categoryIcons[resource.category];
  const TypeIcon = typeIcons[resource.type];
  const levelInfo = levels.find((l) => l.id === resource.level);

  return (
    <Link 
      to={`/resource/${resource.id}`}
      className="group block"
    >
      <article className="h-full bg-card rounded-xl border border-border p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 transition-transform group-hover:scale-110">
            <CategoryIcon className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Badge 
              variant="secondary" 
              className={`${levelInfo?.color} border-0 font-medium`}
            >
              {levelInfo?.label}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <TypeIcon className="h-3 w-3" />
              {resource.type}
            </Badge>
          </div>
        </div>

        <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
          {resource.views && (
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {resource.views.toLocaleString()}
            </span>
          )}
          <span className="flex items-center gap-1 text-primary group-hover:underline">
            View Resource
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </article>
    </Link>
  );
}
