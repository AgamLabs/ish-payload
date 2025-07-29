import type { Media, Product } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import { CURRENCY_CODE, PRODUCT_COLLECTION, QUERY_DEPTH } from "./productConstants";

export interface ProductPricing {
  price: number;
  hasStock: boolean;
}

export interface ProductGallery {
  gallery: Media[];
}

export interface StructuredProductData {
  "@context": string;
  "@type": string;
  name: string;
  description?: string;
  image?: string;
  offers: {
    "@type": string;
    availability: string;
    price: number;
    priceCurrency: string;
  };
}

/**
 * Calculates the highest price from product variants or returns the base price
 */
export const calculateProductPrice = (product: Product): number => {
  if (!product.enableVariants || !product.variants?.variants?.length) {
    return product.price || 0;
  }

  return product.variants.variants.reduce((maxPrice, variant) => {
    return Math.max(maxPrice, variant?.price || 0);
  }, product.price || 0);
};

/**
 * Determines if a product has stock available
 */
export const checkProductStock = (product: Product): boolean => {
  if (!product.enableVariants) {
    return (product.stock ?? 0) > 0;
  }

  const variants = product.variants?.variants || [];
  return variants.some((variant) => (variant?.stock ?? 0) > 0);
};

/**
 * Builds a complete gallery including product images and variant images
 */
export const buildProductGallery = (product: Product): Media[] => {
  const gallery: Media[] = [];
  
  // Add main product gallery images
  if (product.gallery) {
    product.gallery.forEach((image) => {
      if (typeof image === "object" && image !== null) {
        gallery.push(image);
      }
    });
  }

  // Add variant images if variants are enabled
  if (product.enableVariants && product.variants?.variants) {
    product.variants.variants.forEach((variant) => {
      if (variant?.images?.length) {
        variant.images.forEach((image) => {
          if (typeof image === "object" && image !== null) {
            gallery.push(image);
          }
        });
      }
    });
  }

  return gallery;
};

/**
 * Generates structured data for product SEO
 */
export const generateProductStructuredData = (
  product: Product,
  price: number,
  hasStock: boolean,
  metaImage?: Media
): StructuredProductData => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: typeof product.description === "string" ? product.description : undefined,
    image: metaImage?.url || undefined,
    offers: {
      "@type": "AggregateOffer",
      availability: hasStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      price,
      priceCurrency: CURRENCY_CODE,
    },
  };
};

/**
 * Filters and type-guards related products
 */
export const getValidRelatedProducts = (product: Product): Product[] => {
  return (
    product.relatedProducts?.filter(
      (relatedProduct): relatedProduct is Product =>
        typeof relatedProduct !== "string"
    ) ?? []
  );
};

/**
 * Extracts meta image from product data
 */
export const getProductMetaImage = (product: Product): Media | undefined => {
  const metaImage = product.meta?.image;
  return typeof metaImage === "object" && metaImage !== null 
    ? metaImage 
    : undefined;
};

/**
 * Queries a product by slug with proper error handling
 */
export const queryProductBySlug = async ({ slug }: { slug: string }): Promise<Product | null> => {
  try {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: PRODUCT_COLLECTION,
      depth: QUERY_DEPTH,
      draft,
      limit: 1,
      overrideAccess: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return result.docs?.[0] || null;
  } catch (error) {
    console.error(`Error querying product by slug "${slug}":`, error);
    return null;
  }
};
