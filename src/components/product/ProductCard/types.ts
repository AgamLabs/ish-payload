import type { Product } from '@/payload-types';

export interface ProductCardProps {
  product: Product;
  className?: string;
  showPrice?: boolean;
  imageClassName?: string;
  titleClassName?: string;
  hoverEffect?: boolean;
}

export interface ProductCardVariantProps extends Omit<ProductCardProps, 'className' | 'imageClassName' | 'titleClassName'> {
  // Additional variant-specific props can be added here
}

export type ProductCardVariant = 'section3' | 'section4' | 'grid' | 'related';

export interface CartButtonState {
  isHovered: boolean;
  isLoading: boolean;
  isDisabled: boolean;
}
