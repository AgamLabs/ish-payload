import React, { Suspense } from "react";
import type { Media } from "@/payload-types";
import { Gallery } from "@/components/product/Gallery";

interface ProductGalleryProps {
  gallery: Media[];
  fallback?: React.ReactNode;
}

const DEFAULT_GALLERY_FALLBACK = (
  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
);

/**
 * Product gallery component with suspense wrapper and loading fallback
 */
export function ProductGallery({ 
  gallery, 
  fallback = DEFAULT_GALLERY_FALLBACK 
}: ProductGalleryProps) {
  if (!gallery.length) return null;

  return (
    <div className="h-full w-full basis-full lg:basis-4/6">
      <Suspense fallback={fallback}>
        <Gallery
          images={gallery.filter(
            (item): item is Media => typeof item === "object"
          )}
        />
      </Suspense>
    </div>
  );
}
