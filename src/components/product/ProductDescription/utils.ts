import type { Product } from "@/payload-types";
import type { VariantSelection, PriceCalculationResult, BreadcrumbData } from "./types";

/**
 * Calculates the current price based on variant selections
 */
export function calculateCurrentPrice(
  product: Product,
  variantId: string | null,
  variantSelections: VariantSelection
): PriceCalculationResult {
  const basePrice = product.price || 0;
  const hasVariants = Boolean(product.enableVariants && product.variants?.variants?.length);

  // If no variants, return base price
  if (!hasVariants) {
    return {
      currentPrice: basePrice,
      fallbackUsed: false
    };
  }

  const variants = product.variants?.variants || [];

  // If variant ID is specified, use that variant's price
  if (variantId) {
    const selectedVariant = variants.find(v => v.id === variantId);
    if (selectedVariant) {
      return {
        currentPrice: selectedVariant.price,
        selectedVariant,
        fallbackUsed: false
      };
    }
  }

  // Try to match variant based on selections
  if (Object.keys(variantSelections).length > 0) {
    const matchingVariant = findVariantBySelections(variants, variantSelections, product.variants?.options);
    if (matchingVariant) {
      return {
        currentPrice: matchingVariant.price,
        selectedVariant: matchingVariant,
        fallbackUsed: false
      };
    }
  }

  // Fallback to first variant or base price
  const fallbackPrice = variants.length > 0 ? variants[0].price : basePrice;
  return {
    currentPrice: fallbackPrice,
    selectedVariant: variants[0],
    fallbackUsed: true
  };
}

/**
 * Finds variant matching current selections
 */
function findVariantBySelections(
  variants: any[],
  selections: VariantSelection,
  variantOptions: any[] | undefined
): any | undefined {
  if (!variantOptions || variants.length === 0) return undefined;

  return variants.find(variant => {
    if (!Array.isArray(variant.options)) return false;

    // For single option products
    if (variantOptions.length === 1) {
      const selectedValue = Object.values(selections)[0];
      return variant.options.some((opt: any) => 
        opt.slug === selectedValue || opt.label === selectedValue
      );
    }

    // For multiple options - all selections must match
    return Object.entries(selections).every(([paramKey, selectedValue]) => {
      return variant.options.some((opt: any) => 
        opt.slug === selectedValue || opt.label === selectedValue
      );
    });
  });
}

/**
 * Extracts variant selections from search params
 */
export function extractVariantSelections(
  searchParams: URLSearchParams,
  variantOptions: any[] | undefined
): VariantSelection {
  if (!variantOptions) return {};

  const selections: VariantSelection = {};
  variantOptions.forEach(option => {
    const paramValue = searchParams.get(option.slug.toLowerCase());
    if (paramValue) {
      selections[option.slug.toLowerCase()] = paramValue;
    }
  });

  return selections;
}

/**
 * Extracts category data from product
 */
export function extractCategoryData(product: Product): BreadcrumbData | undefined {
  if (!product.categories || product.categories.length === 0) {
    return undefined;
  }

  const category = product.categories[0];
  if (typeof category === "object" && "slug" in category && "title" in category) {
    return {
      slug: category.slug,
      name: category.title
    };
  }

  return undefined;
}

/**
 * Validates if product has properly configured variants
 */
export function validateProductVariants(product: Product): boolean {
  return Boolean(
    product.enableVariants && 
    product.variants?.variants?.length && 
    product.variants?.options?.length
  );
}
