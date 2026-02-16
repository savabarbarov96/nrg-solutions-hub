import { useState } from 'react';
import {
  useProjectImages,
  useUploadProjectImage,
  useDeleteProjectImage,
  useReorderProjectImages,
} from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Upload, X, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectImageManagerProps {
  projectId: number;
}

export function ProjectImageManager({ projectId }: ProjectImageManagerProps) {
  const { data: images, isLoading } = useProjectImages(projectId);
  const uploadMutation = useUploadProjectImage();
  const deleteMutation = useDeleteProjectImage();
  const reorderMutation = useReorderProjectImages();

  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }

      try {
        const displayOrder = (images?.length || 0) + i;
        await uploadMutation.mutateAsync({ projectId, file, displayOrder });
        toast.success(`${file.name} uploaded successfully`);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error(error);
      }
    }

    // Reset input
    e.target.value = '';
  };

  const handleDelete = async () => {
    if (imageToDelete === null) return;

    try {
      await deleteMutation.mutateAsync({ imageId: imageToDelete, projectId });
      toast.success('Image deleted successfully');
      setImageToDelete(null);
    } catch (error) {
      toast.error('Failed to delete image');
      console.error(error);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index || !images) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    // Update display orders
    const updates = newImages.map((img, idx) => ({
      id: img.id,
      display_order: idx,
    }));

    reorderMutation.mutate({ projectId, updates });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Project Images</Label>
        <p className="text-sm text-muted-foreground">
          Upload images for this project. Drag to reorder.
        </p>
      </div>

      {/* Upload Button */}
      <div>
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="image-upload">
          <Button type="button" variant="outline" className="gap-2" asChild>
            <span>
              <Upload className="h-4 w-4" />
              Upload Images
            </span>
          </Button>
        </label>
      </div>

      {/* Images Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="aspect-video rounded-lg" />
          ))}
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className="cursor-move group relative overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img
                    src={image.image_url}
                    alt={`Project image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <GripVertical className="h-5 w-5 text-white" />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setImageToDelete(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Primary
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">No images uploaded yet</p>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={imageToDelete !== null} onOpenChange={() => setImageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
