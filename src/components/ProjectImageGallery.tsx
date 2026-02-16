import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectImageGalleryProps {
  images: { id: number; image_url: string }[];
}

export function ProjectImageGallery({ images }: ProjectImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [lightboxRef, lightboxApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const scrollLightboxPrev = () => lightboxApi?.scrollPrev();
  const scrollLightboxNext = () => lightboxApi?.scrollNext();

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
    setTimeout(() => {
      lightboxApi?.scrollTo(index);
    }, 100);
  };

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <>
        <Card className="overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
          <img
            src={images[0].image_url}
            alt="Project"
            className="w-full h-auto object-cover"
          />
        </Card>

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl p-0">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <img
                src={images[0].image_url}
                alt="Project"
                className="w-full h-auto"
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Carousel */}
        <div className="overflow-hidden relative" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="flex-[0_0_100%] min-w-0 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Card className="overflow-hidden mx-2">
                  <img
                    src={image.image_url}
                    alt={`Project ${index + 1}`}
                    className="w-full h-auto object-cover aspect-video"
                  />
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                emblaApi?.scrollTo(index);
              }}
              className={cn(
                'relative aspect-video rounded-md overflow-hidden border-2 transition-colors',
                'hover:border-primary focus:outline-none focus:border-primary'
              )}
            >
              <img
                src={image.image_url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-6xl p-0 h-[90vh]">
          <div className="relative h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="overflow-hidden h-full" ref={lightboxRef}>
              <div className="flex h-full">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-4"
                  >
                    <img
                      src={image.image_url}
                      alt={`Project ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={scrollLightboxPrev}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={scrollLightboxNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
