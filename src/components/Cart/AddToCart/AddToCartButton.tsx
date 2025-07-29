import React from 'react';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';
import type { AddToCartButtonProps } from './types';

export function AddToCartButton({
  onAddToCart,
  isDisabled = false,
  isLoading = false,
  className
}: AddToCartButtonProps) {
  const buttonClasses = clsx(
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white',
    {
      'hover:opacity-90': !isDisabled && !isLoading,
      'cursor-not-allowed opacity-60': isDisabled || isLoading,
    },
    className
  );

  return (
    <button
      aria-label="Add to cart"
      className={buttonClasses}
      onClick={onAddToCart}
      disabled={isDisabled || isLoading}
      type="submit"
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {isLoading ? 'Adding...' : 'Add To Cart'}
    </button>
  );
}
