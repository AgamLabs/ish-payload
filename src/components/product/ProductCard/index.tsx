'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { Product, Media } from '@/payload-types';
import { useCart } from '@/providers/Cart';
import { Price } from '@/components/Price';
import { CURRENCY_CODE } from '@/utilities/productConstants';
import { 
  buildProductUrl, 
  createCartItem, 
  validateCartAddition 
} from '@/components/Cart/AddToCart/utils';
import type { ProductCardProps, ProductCardVariantProps } from './types';

/**
 * Reusable ProductCard component with hover cart functionality
 * Displays product image, title, price (optional) and cart icon on hover
 */
export function ProductCard({
  product,
  className = '',
  showPrice = true,
  imageClassName = '',
  titleClassName = '',
  hoverEffect = true
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItemToCart } = useCart();

  // Get product image
  const gallery = product.gallery as Media[];
  const metaImage = product.meta?.image as Media;
  const firstGalleryImage = gallery?.[0];
  const image = metaImage || firstGalleryImage;
  const imageSrc = image?.url || '/media/image-hero1-1.webp';

  // Handle add to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAddingToCart) return;

    const validation = validateCartAddition(product, null);
    if (!validation.isValid) {
      console.warn('Cannot add to cart:', validation.reason);
      return;
    }

    setIsAddingToCart(true);

    try {
      const productUrl = buildProductUrl(product, null);
      const cartItem = createCartItem(product, null, productUrl);
      await addItemToCart(cartItem);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      className={`group relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className={`relative overflow-hidden rounded-xl ${imageClassName}`}>
          {/* Product Image */}
          {imageSrc ? (
            <Image
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              src={imageSrc}
              alt={product.title}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 155px, 270px"
              quality={75}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}

          {/* Cart Icon Overlay */}
          <div
            className={`
              absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center
              transition-opacity duration-300 z-10
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`
                bg-white hover:bg-gray-100 text-black rounded-full p-3
                shadow-lg transition-all duration-200 z-20
                ${isAddingToCart ? 'opacity-70 cursor-not-allowed' : 'hover:scale-110'}
              `}
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart 
                className={`h-5 w-5 ${isAddingToCart ? 'animate-pulse' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-3">
          <h3 className={`text-center font-medium ${titleClassName}`}>
            {product.title}
          </h3>
          
          {showPrice && product.price && (
            <div className="mt-1 text-center">
              <Price
                amount={product.price}
                currencyCode={CURRENCY_CODE}
                className="text-sm font-semibold"
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

/**
 * ProductCard variants for different layouts
 */
export const ProductCardVariants = {
  // For home page Section3 (marquee)
  Section3: (props: ProductCardVariantProps) => (
    <ProductCard
      {...props}
      className="flex-shrink-0"
      imageClassName="w-[270px] h-[260px]"
      titleClassName="text-[22px] text-grayforbottomtext"
      showPrice={false}
    />
  ),

  // For home page Section4 (grid)
  Section4: (props: ProductCardVariantProps) => (
    <ProductCard
      {...props}
      className="mx-auto"
      imageClassName="w-[155px] h-[155px] sm:w-[270px] sm:h-[260px]"
      titleClassName="sm:text-[22px] text-grayforbottomtext"
      showPrice={false}
    />
  ),

  // For search/grid pages
  Grid: (props: ProductCardVariantProps) => (
    <ProductCard
      {...props}
      className="w-full"
      imageClassName="aspect-square w-full"
    />
  ),

  // For related products
  Related: (props: ProductCardVariantProps) => (
    <ProductCard
      {...props}
      className="aspect-square w-full"
      imageClassName="h-full w-full"
    />
  ),
};
