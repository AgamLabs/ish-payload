import type { Product } from '@/payload-types';
import type { CartItem as ProviderCartItem } from '@/providers/Cart/reducer';

export type ProductVariant = NonNullable<NonNullable<Product['variants']>['variants']>[number];

export interface AddToCartProps {
  product: Product;
  variants?: ProductVariant[];
}

// Use the CartItem type from the provider
export type CartItem = ProviderCartItem;

export interface AddToCartButtonProps {
  onAddToCart: (e: React.FormEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}
