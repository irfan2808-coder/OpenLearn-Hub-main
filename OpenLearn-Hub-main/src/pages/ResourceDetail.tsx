import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Code, 
  ExternalLink, 
  Eye, 
  FileText, 
  Flag, 
  Globe, 
  GraduationCap, 
  Heart, 
  Lightbulb, 
  Play, 
  Share2, 
  Users,
  Calendar
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { mockResources, levels } from '@/data/resources';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

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

const ResourceDetail = () => {
  const { id } = useParams();
  const resource = mockResources.find((r) => r.id === id);

  if (!resource) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Resource Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The resource you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/resources">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const CategoryIcon = categoryIcons[resource.category];
  const TypeIcon = typeIcons[resource.type];
  const levelInfo = levels.find((l) => l.id === resource.level);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleReport = () => {
    toast.success('Thank you for reporting. We will review this resource.');
  };

  return (
    <Layout>
      <div className="container py-12">
        {/* Back Button */}
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Resources
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-card rounded-xl border border-border p-8 shadow-card">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <CategoryIcon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
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
                    <Badge variant="outline" className="capitalize">
                      {resource.category}
                    </Badge>
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold">
                    {resource.title}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {resource.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gradient-primary shadow-button flex-1">
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    Access Resource
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h3 className="font-display font-semibold mb-4">Resource Info</h3>
              <dl className="space-y-4">
                {resource.views && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      Views
                    </dt>
                    <dd className="font-semibold">{resource.views.toLocaleString()}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Added
                  </dt>
                  <dd className="font-semibold">
                    {new Date(resource.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
                {resource.contributor && (
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Contributor
                    </dt>
                    <dd className="font-semibold">{resource.contributor}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Report Card */}
            <div className="bg-muted/50 rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold mb-2">Found an issue?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If this resource link is broken or the content is inappropriate, please let us know.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={handleReport}
              >
                <Flag className="mr-2 h-4 w-4" />
                Report Resource
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceDetail;
