import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProjectForm, ProjectFormData } from '@/components/admin/ProjectForm';
import { useCreateProject, useUploadProjectImage } from '@/hooks/useProjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function ProjectNew() {
  const navigate = useNavigate();
  const createMutation = useCreateProject();
  const uploadImageMutation = useUploadProjectImage();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const isSubmitting = createMutation.isPending || isUploadingImages;

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setSelectedImages((prev) => [...prev, ...validFiles]);
    }

    e.target.value = '';
  };

  const removeSelectedImage = (indexToRemove: number) => {
    setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      const newProject = await createMutation.mutateAsync(data);

      if (selectedImages.length > 0) {
        setIsUploadingImages(true);
        const failedUploads: string[] = [];

        for (let i = 0; i < selectedImages.length; i++) {
          const file = selectedImages[i];
          try {
            await uploadImageMutation.mutateAsync({
              projectId: newProject.id,
              file,
              displayOrder: i,
            });
          } catch {
            failedUploads.push(file.name);
          }
        }

        if (failedUploads.length > 0) {
          toast.error(
            `Project created, but ${failedUploads.length} image(s) failed to upload`
          );
        } else {
          toast.success('Project and images created successfully');
        }
      } else {
        toast.success('Project created successfully');
      }

      navigate(`/admin/projects/${newProject.id}/edit`);
    } catch (error) {
      toast.error('Failed to create project');
      console.error(error);
    } finally {
      setIsUploadingImages(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/admin/projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
            <p className="text-muted-foreground">Add a new solar installation project</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select images now and they will be uploaded automatically right after the project is created.
            </p>

            <input
              type="file"
              id="new-project-image-upload"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageSelection}
              className="hidden"
              disabled={isSubmitting}
            />

            <label htmlFor="new-project-image-upload">
              <Button type="button" variant="outline" className="gap-2" asChild disabled={isSubmitting}>
                <span>
                  <Upload className="h-4 w-4" />
                  Select Images
                </span>
              </Button>
            </label>

            {selectedImages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Selected files: {selectedImages.length}
                </p>
                <div className="space-y-2">
                  {selectedImages.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded border px-3 py-2"
                    >
                      <span className="text-sm truncate pr-4">{file.name}</span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeSelectedImage(index)}
                        disabled={isSubmitting}
                        className="h-7 w-7 shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
