import { useState, useEffect } from "react";
import type { ImageMetadata } from "astro";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamPhotoDialogProps {
  image: ImageMetadata;
  alt: string;
  width?: number;
  height?: number;
}

export default function TeamPhotoDialog({
  image,
  alt,
  width = 600,
  height = 600,
}: TeamPhotoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the full-size image
    const preloadImage = new Image();
    preloadImage.src = image.src;
    preloadImage.onload = () => setIsImageLoaded(true);
  }, [image.src]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="aspect-square w-full overflow-hidden rounded-lg"
      >
        <img
          src={image.src}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </button>

      {/* Hidden preload container */}
      <div className="hidden">
        <img
          src={image.src}
          alt=""
          width={width}
          height={height}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-hidden bg-white p-6 md:max-w-4xl">
          <DialogTitle className="sr-only">Team Photo</DialogTitle>
          <DialogDescription className="sr-only">{alt}</DialogDescription>
          <div className="relative flex flex-col gap-4">
            {/* Close button positioned outside the image */}
            <DialogClose className="absolute -right-2 -top-2 z-50 rounded-full bg-white p-2 text-gray-500 shadow-md hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>

            {/* Image container with white border */}
            <div className="relative overflow-hidden rounded-lg border-8 border-white bg-white shadow-xl">
              <img
                src={image.src}
                alt={alt}
                className={cn(
                  "h-full w-full rounded-sm object-contain transition-opacity duration-200",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
              />
            </div>

            {/* Caption below the image */}
            <div className="text-center">
              <p className="font-handwriting text-xl text-gray-700">{alt}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
