import type { Metadata } from "next";
import type { Product, Media } from "@/payload-types";

export const HIDDEN_PRODUCT_TAG = "hidden";

/**
 * Extracts image information from meta image field
 */
function extractImageInfo(metaImage: Product['meta']) {
  if (!metaImage?.image || typeof metaImage.image === "number") {
    return {
      altText: undefined,
      height: undefined,
      url: undefined,
      width: undefined,
    };
  }

  const image = metaImage.image as Media;
  return {
    altText: image.alt,
    height: image.height,
    url: image.url,
    width: image.width,
  };
}

/**
 * Extracts description from rich text or plain text fields
 */
function extractDescription(product: Product): string | undefined {
  if (product.meta?.description) {
    return product.meta.description;
  }
  
  if (product.descriptionPlain) {
    return product.descriptionPlain;
  }
  
  // Fallback: truncate title if no description available
  if (product.title.length > 160) {
    return `${product.title.substring(0, 157)}...`;
  }
  
  return product.title;
}

/**
 * Generates SEO-friendly title with fallbacks
 */
function generateTitle(product: Product): string {
  if (product.meta?.title) {
    return product.meta.title;
  }
  
  return product.title;
}

/**
 * Generates metadata for a product page
 */
export function generateProductMetadata(product: Product): Metadata {
  const { altText, height, url, width } = extractImageInfo(product.meta);
  const title = generateTitle(product);
  const description = extractDescription(product);
  
  // For this implementation, we'll assume all products are indexable
  // You can modify this logic based on your business requirements
  const indexable = true;

  return {
    title,
    description,
    openGraph: url
      ? {
          title,
          description,
          images: [
            {
              alt: altText || '',
              height: height || undefined,
              url,
              width: width || undefined,
            },
          ],
          type: 'website',
        }
      : undefined,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
  };
}

/**
 * Default metadata for product pages when no product is found
 */
export function getDefaultProductMetadata(): Metadata {
  return {
    title: 'Product Not Found',
    description: 'The requested product could not be found.',
    robots: {
      index: false,
      follow: false,
    },
  };
}
