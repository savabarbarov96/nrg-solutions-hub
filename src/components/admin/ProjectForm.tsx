import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DynamicListField } from './DynamicListField';
import type { Project } from '@/types/database';

const projectFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  city: z.string().min(1, 'City is required'),
  power: z.string().min(1, 'Power is required'),
  type: z.enum(['home', 'business'], { required_error: 'Type is required' }),
  summary: z.string().min(1, 'Summary is required'),
  completed_scope: z.array(z.string()).min(1, 'At least one scope item is required'),
  solis_note: z.string().optional().transform((value) => value?.trim() ?? ''),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: ProjectFormData) => void;
  isSubmitting?: boolean;
}

export function ProjectForm({ initialData, onSubmit, isSubmitting }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          city: initialData.city,
          power: initialData.power,
          type: initialData.type,
          summary: initialData.summary,
          completed_scope: initialData.completed_scope,
          solis_note: initialData.solis_note,
        }
      : {
          completed_scope: [],
        },
  });

  const completedScope = watch('completed_scope');
  const title = watch('title');

  // Auto-generate slug from title
  const handleGenerateSlug = () => {
    if (title) {
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Remove duplicate hyphens
      setValue('slug', slug);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" {...register('title')} placeholder="Покривна система за еднофамилна къща" />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="slug">Slug *</Label>
          <Button type="button" variant="outline" size="sm" onClick={handleGenerateSlug}>
            Generate from Title
          </Button>
        </div>
        <Input id="slug" {...register('slug')} placeholder="sofia-house-12kw" />
        <p className="text-xs text-muted-foreground">
          Lowercase alphanumeric with hyphens. Used in URL.
        </p>
        {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
      </div>

      {/* City and Power */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" {...register('city')} placeholder="София" />
          {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="power">Power *</Label>
          <Input id="power" {...register('power')} placeholder="12 kW" />
          {errors.power && <p className="text-sm text-destructive">{errors.power.message}</p>}
        </div>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label htmlFor="type">Type *</Label>
        <Select
          value={watch('type')}
          onValueChange={(value: 'home' | 'business') => setValue('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary">Summary *</Label>
        <Textarea
          id="summary"
          {...register('summary')}
          placeholder="Brief description of the project..."
          rows={3}
        />
        {errors.summary && <p className="text-sm text-destructive">{errors.summary.message}</p>}
      </div>

      {/* Completed Scope */}
      <DynamicListField
        label="Completed Scope *"
        value={completedScope}
        onChange={(value) => setValue('completed_scope', value)}
        placeholder="Enter scope item"
      />
      {errors.completed_scope && (
        <p className="text-sm text-destructive">{errors.completed_scope.message}</p>
      )}

      {/* Solis Note */}
      <div className="space-y-2">
        <Label htmlFor="solis_note">Integration Note (Optional)</Label>
        <Textarea
          id="solis_note"
          {...register('solis_note')}
          placeholder="Notes about monitoring/integration (e.g. Solis, SolarEdge, Enphase)..."
          rows={2}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : initialData ? 'Update Project' : 'Create Project'}
      </Button>
    </form>
  );
}
