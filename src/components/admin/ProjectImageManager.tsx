import { useState } from 'react';
import {
  useProjectImages,
  useUploadProjectImage,
  useDeleteProjectImage,
  useReorderProjectImages,
  useUpdateImageRotation,
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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Upload, X, GripVertical, RotateCw, ZoomIn } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectImageManagerProps {
  projectId: number;
  onProjectMaterialized?: (newProjectId: number) => void;
}

export function ProjectImageManager({ projectId, onProjectMaterialized }: ProjectImageManagerProps) {
  const { data: images, isLoading } = useProjectImages(projectId);
  const uploadMutation = useUploadProjectImage();
  const deleteMutation = useDeleteProjectImage();
  const reorderMutation = useReorderProjectImages();
  const rotationMutation = useUpdateImageRotation();

  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; rotation: number } | null>(null);

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
        const result = await uploadMutation.mutateAsync({ projectId, file, displayOrder });
        toast.success(`${file.name} uploaded successfully`);

        // If the static project was just materialised into DB under a new id,
        // notify parent so the URL can track the real DB id from now on.
        if (result.resolved_project_id && result.resolved_project_id !== projectId) {
          onProjectMaterialized?.(result.resolved_project_id);
          break; // stop the loop; subsequent uploads should use the new id
        }
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

  const handleRotate = (imageId: number, currentRotation: number, imageUrl: string) => {
    const newRotation = (currentRotation + 90) % 360;
    rotationMutation.mutate(
      { imageId, rotation: newRotation, projectId, imageUrl },
      {
        onSuccess: (result) => {
          // If rotating a hardcoded image materialised the project, move to the
          // real DB id so subsequent operations hit the correct row.
          if (result?.resolved_project_id && result.resolved_project_id !== projectId) {
            onProjectMaterialized?.(result.resolved_project_id);
          }
        },
        onError: (err) => {
          const msg = err instanceof Error ? err.message : 'Unknown error';
          toast.error(`Failed to rotate: ${msg}`, { duration: 10000 });
          console.error('Rotate error:', err);
        },
      }
    );
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
          Upload images for this project. Drag to reorder. Rotate or preview images.
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
                    style={{ transform: `rotate(${image.rotation || 0}deg)` }}
                  />

                  {/* Persistent drag handle (top-left) */}
                  <div
                    className="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-md bg-black/55 text-white shadow-sm backdrop-blur-sm"
                    title="Drag to reorder"
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>

                  {/* Persistent action buttons (top-right) */}
                  <div className="absolute top-2 right-2 flex gap-1 rounded-md bg-black/40 p-1 shadow-sm backdrop-blur-sm">
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => { e.stopPropagation(); setLightboxImage({ url: image.image_url, rotation: image.rotation || 0 }); }}
                      title="Preview"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => { e.stopPropagation(); handleRotate(image.id, image.rotation || 0, image.image_url); }}
                      title="Rotate 90°"
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => { e.stopPropagation(); setImageToDelete(image.id); }}
                      title="Delete"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground shadow-sm">
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

      {/* Lightbox Preview Dialog */}
      <Dialog open={lightboxImage !== null} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setLightboxImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            {lightboxImage && (
              <img
                src={lightboxImage.url}
                alt="Preview"
                className="max-w-full max-h-[80vh] object-contain"
                style={{ transform: `rotate(${lightboxImage.rotation}deg)` }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

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
