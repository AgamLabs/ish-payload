'use client';

import React from 'react';
import type { Product } from '@/payload-types';
import { useCart } from '@/providers/Cart';
import type { ProductVariant } from './types';
import { useAddToCart } from './useAddToCart';
import { AddToCartButton } from './AddToCartButton';

interface AddToCartProps {
  product: Product;
  variants?: ProductVariant[];
}

export function AddToCart({ product, variants }: AddToCartProps) {
  const { addItemToCart } = useCart();
  
  const {
    handleAddToCart,
    isValid,
    validationMessage
  } = useAddToCart(product, variants, addItemToCart);

  return (
    <AddToCartButton
      onAddToCart={handleAddToCart}
      isDisabled={!isValid}
    />
  );
}
