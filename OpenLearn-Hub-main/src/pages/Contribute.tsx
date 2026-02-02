import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { categories, levels, resourceTypes } from '@/data/resources';
import { toast } from 'sonner';
import { CheckCircle, Heart, Send } from 'lucide-react';
import { z } from 'zod';

const contributionSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(500, 'Description must be less than 500 characters'),
  url: z.string().url('Please enter a valid URL').or(z.literal('')),
  category: z.string().min(1, 'Please select a category'),
  level: z.string().min(1, 'Please select a level'),
  type: z.string().min(1, 'Please select a type'),
  contributor: z.string().max(50, 'Name must be less than 50 characters').optional(),
});

const Contribute = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: '',
    level: '',
    type: '',
    contributor: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
    if (errors.file) {
      setErrors((prev) => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Custom validation for URL or file
    if (!formData.url && !uploadedFile) {
      setErrors({ url: 'Please provide either a URL or upload a file' });
      return;
    }

    try {
      // Only validate URL if provided
      const dataToValidate = {
        ...formData,
        file: uploadedFile || undefined,
      };
      contributionSchema.parse(dataToValidate);
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Thank you for your contribution!', {
        description: 'Your resource has been submitted for review.',
      });

      navigate('/resources');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary mb-4">
              <Heart className="h-4 w-4 fill-current" />
              Community Contribution
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Share a Free Resource
            </h1>
            <p className="text-lg text-muted-foreground">
              Help fellow learners discover quality free educational materials.
            </p>
          </div>

          {/* Guidelines */}
          <div className="bg-muted/50 rounded-xl p-6 mb-8">
            <h2 className="font-display font-semibold mb-3">Submission Guidelines</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                Resource must be 100% free to access (no paywalls or trials)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                Content should be educational and high quality
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                No promotional or marketing content
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                Resources are reviewed before being published
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-card space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Resource Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Complete Python Beginner Course"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what learners will gain from this resource..."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              {/* URL */}
              <div className="space-y-2">
                <Label htmlFor="url">Resource URL</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={handleInputChange}
                  className={errors.url ? 'border-destructive' : ''}
                />
                {errors.url && (
                  <p className="text-sm text-destructive">{errors.url}</p>
                )}
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or upload a file</span>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>Upload Resource</Label>
                <FileUpload
                  value={uploadedFile}
                  onChange={handleFileChange}
                  maxSize={10}
                  error={errors.file}
                />
              </div>

              {/* Selects Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category}</p>
                  )}
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <Label>Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleSelectChange('level', value)}
                  >
                    <SelectTrigger className={errors.level ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.level && (
                    <p className="text-sm text-destructive">{errors.level}</p>
                  )}
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label>Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-destructive">{errors.type}</p>
                  )}
                </div>
              </div>

              {/* Contributor Name */}
              <div className="space-y-2">
                <Label htmlFor="contributor">Your Name (Optional)</Label>
                <Input
                  id="contributor"
                  name="contributor"
                  placeholder="How should we credit you?"
                  value={formData.contributor}
                  onChange={handleInputChange}
                  className={errors.contributor ? 'border-destructive' : ''}
                />
                {errors.contributor && (
                  <p className="text-sm text-destructive">{errors.contributor}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full gradient-primary shadow-button font-semibold"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  Submit Resource
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contribute;
