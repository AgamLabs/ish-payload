import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { Product } from '@/payload-types';
import type { ProductVariant, CartItem } from './types';
import { buildProductUrl, createCartItem, validateCartAddition } from './utils';

export function useAddToCart(
  product: Product, 
  variants: ProductVariant[] | undefined,
  onAddItem: (item: CartItem) => Promise<void>
) {
  const searchParams = useSearchParams();
  const selectedVariantId = searchParams.get('variant');

  // Build product URL with current selections
  const productUrl = useMemo(() => 
    buildProductUrl(product, selectedVariantId, variants),
    [product, selectedVariantId, variants]
  );

  // Validate current selection
  const validation = useMemo(() => 
    validateCartAddition(product, selectedVariantId),
    [product, selectedVariantId]
  );

  // Handle add to cart action
  const handleAddToCart = useCallback(
    async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!validation.isValid) {
        console.warn('Cannot add to cart:', validation.reason);
        return;
      }

      const cartItem = createCartItem(product, selectedVariantId, productUrl);
      
      try {
        await onAddItem(cartItem);
      } catch (error) {
        console.error('Failed to add item to cart:', error);
      }
    },
    [validation, product, selectedVariantId, productUrl, onAddItem]
  );

  return {
    handleAddToCart,
    isValid: validation.isValid,
    validationMessage: validation.reason,
    selectedVariantId,
    productUrl
  };
}
