import type { Product } from "@/payload-types";

export interface ProductDescriptionProps {
  product: Product;
}

export interface PriceDisplayProps {
  price: number;
  currency: string;
  variantId?: string | null;
}

export interface BreadcrumbData {
  slug: string;
  name: string;
}

export interface ProductMetadata {
  title: string;
  category?: BreadcrumbData;
  hasVariants: boolean;
  variantCount: number;
}

export interface VariantSelection {
  [paramKey: string]: string;
}

export interface PriceCalculationResult {
  currentPrice: number;
  selectedVariant?: any;
  fallbackUsed: boolean;
}
