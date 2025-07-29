'use client'
import type { Product } from '@/payload-types'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import React from 'react'
import { ProductCard } from '@/components/product/ProductCard'

export const CarouselClient: React.FC<{ products: Product[] }> = async ({ products }) => {
  if (!products?.length) return null

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products]

  return (
    <Carousel
      className="w-full"
      opts={{ align: 'start', loop: true }}
      plugins={[
        AutoScroll({
          playOnInit: true,
          speed: 1,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {carouselProducts.map((product, i) => (
          <CarouselItem
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
            key={`${product.slug}${i}`}
          >
            <ProductCard
              product={product}
              className="h-full w-full"
              imageClassName="h-full w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
