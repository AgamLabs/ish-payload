"use client";

import type { Product } from '@/payload-types'
import { Grid } from '@/components/grid'
import { ProductCard } from '@/components/product/ProductCard'
import React from 'react'

export function ProductGridItems({ products }: { products: Partial<Product>[] }) {
  return (
    <React.Fragment>
      {products.map((product) => {
        // Ensure we have a complete product for the card
        if (!product.id || !product.title || !product.slug) return null;

        return (
          <Grid.Item className="animate-fadeIn" key={product.id}>
            <ProductCard 
              product={product as Product}
              className="w-full"
              imageClassName="aspect-square w-full"
            />
          </Grid.Item>
        )
      })}
    </React.Fragment>
  )
}
