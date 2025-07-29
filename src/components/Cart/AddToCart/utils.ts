import type { Product } from '@/payload-types';
import type { ProductVariant, CartItem } from "./types";

/**
 * Builds the product URL with variant parameters
 */
export function buildProductUrl(
  product: Product,
  selectedVariantId: string | null,
  variants?: ProductVariant[]
): string {
  const base = `/products/${product.slug}`;

  if (!selectedVariantId) {
    return base;
  }

  const variant = variants?.find(v => v.id === selectedVariantId);
  if (!variant) {
    return base;
  }

  const variantOptions = variant.options.map(option => 
    `${option.slug}=${option.slug}`
  );
  
  return `${base}?variant=${selectedVariantId}&${variantOptions.join('&')}`;
}

/**
 * Calculates the unit price for the current selection
 */
export function calculateUnitPrice(
  product: Product,
  selectedVariantId: string | null
): number {
  const basePrice = product.price || 0;

  if (!selectedVariantId || !product.enableVariants || !product.variants?.variants?.length) {
    return basePrice;
  }

  const variant = product.variants.variants.find(v => v.id === selectedVariantId);
  return variant?.price || basePrice;
}

/**
 * Creates a cart item from product and variant selection
 */
export function createCartItem(
  product: Product,
  selectedVariantId: string | null,
  productUrl: string
): CartItem {
  const unitPrice = calculateUnitPrice(product, selectedVariantId);

  return {
    product: product.id, // Use product ID, not the full object
    variantID: selectedVariantId,
    variant: selectedVariantId,
    unitPrice,
    quantity: 1,
    url: productUrl,
    id: selectedVariantId ?? String(product.id), // Convert to string
  };
}

/**
 * Validates if the current selection can be added to cart
 */
export function validateCartAddition(
  product: Product,
  selectedVariantId: string | null
): { isValid: boolean; reason?: string } {
  // Check if product requires variant selection
  if (product.enableVariants && product.variants?.variants?.length) {
    if (!selectedVariantId) {
      return {
        isValid: false,
        reason: "Please select product options before adding to cart"
      };
    }

    // Check if selected variant exists and is in stock
    const variant = product.variants.variants.find(v => v.id === selectedVariantId);
    if (!variant) {
      return {
        isValid: false,
        reason: "Selected variant is no longer available"
      };
    }

    if (variant.stock <= 0) {
      return {
        isValid: false,
        reason: "Selected variant is out of stock"
      };
    }
  }

  return { isValid: true };
}
