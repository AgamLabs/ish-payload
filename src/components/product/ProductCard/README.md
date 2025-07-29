# ProductCard Component Refactor

This document outlines the comprehensive refactoring of product display components to include hover cart functionality across the application.

## Overview

The refactor introduces a new `ProductCard` component with hover cart functionality that appears on all product displays throughout the site, including the home page, search results, related products, and carousels.

## Files Modified

### 1. New Components Created

#### `/src/components/product/ProductCard/`
- **`index.tsx`** - Main ProductCard component with hover cart functionality
- **`types.ts`** - TypeScript type definitions
- **`styles.ts`** - Styling constants and utilities
- **`main.tsx`** - Export index file

### 2. Components Updated

#### Home Page Sections
- **`/src/components/ISH/Section3/index.tsx`** - Marquee product display
- **`/src/components/ISH/Section4/index.tsx`** - Grid product display

#### Product Display Components
- **`/src/components/product/RelatedProducts.tsx`** - Related products on product pages
- **`/src/components/layout/ProductGridItems.tsx`** - Search page product grid
- **`/src/blocks/Carousel/Component.client.tsx`** - Product carousel component

#### Enhanced Existing Components
- **`/src/components/grid/tile.tsx`** - Added optional cart hover functionality

## Features Added

### 1. Hover Cart Functionality
- Cart icon appears on product image hover
- Smooth animation transitions
- One-click add to cart from any product display
- Loading states with visual feedback
- Error handling for cart operations

### 2. Responsive Design
- Works across all screen sizes
- Touch-friendly for mobile devices
- Consistent hover behavior across components

### 3. Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

### 4. Performance Optimized
- Lazy loading images
- Optimized image sizing
- Efficient cart state management

## Usage Examples

### Basic ProductCard
```tsx
import { ProductCard } from '@/components/product/ProductCard';

<ProductCard product={product} />
```

### ProductCard Variants
```tsx
import { ProductCardVariants } from '@/components/product/ProductCard';

// For home page sections
<ProductCardVariants.Section3 product={product} />
<ProductCardVariants.Section4 product={product} />

// For grid layouts
<ProductCardVariants.Grid product={product} />

// For related products
<ProductCardVariants.Related product={product} />
```

### Custom Configuration
```tsx
<ProductCard
  product={product}
  showPrice={true}
  hoverEffect={true}
  className="custom-class"
  imageClassName="w-64 h-64"
  titleClassName="text-lg font-bold"
/>
```

## Component Props

### ProductCard
```tsx
interface ProductCardProps {
  product: Product;
  className?: string;
  showPrice?: boolean;
  imageClassName?: string;
  titleClassName?: string;
  hoverEffect?: boolean;
}
```

## Styling System

The component uses a structured styling system:

- **Base styles** - Common styles for all variants
- **Variant styles** - Specific styles for different use cases
- **Animation configurations** - Hover and interaction animations
- **Responsive breakpoints** - Mobile, tablet, and desktop layouts

## Benefits

1. **Consistent UX** - Same cart interaction across all product displays
2. **Improved Conversion** - Easy add-to-cart from browse experience
3. **Maintainable Code** - Single component for all product cards
4. **Scalable Design** - Easy to add new variants or modify existing ones
5. **Performance** - Optimized for speed and responsiveness

## Integration Points

The ProductCard integrates with:
- **Cart Provider** - For state management
- **Product Utils** - For cart validation and URL building
- **Price Component** - For consistent price display
- **Media Component** - For optimized image display

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Future Enhancements

Possible future improvements:
- Wishlist functionality on hover
- Quick preview modal
- Variant selection on hover
- Bulk add to cart options
- Social sharing buttons
