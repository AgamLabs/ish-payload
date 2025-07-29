"use client";

import type { Product } from "@/payload-types";
import { ProductCard } from "@/components/product/ProductCard";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  className?: string;
}

const DEFAULT_RELATED_PRODUCTS_TITLE = "Related Products";

/**
 * Reusable component for displaying related products in a horizontal scroll layout
 */
export function RelatedProducts({ 
  products, 
  title = DEFAULT_RELATED_PRODUCTS_TITLE,
  className = "py-8"
}: RelatedProductsProps) {
  if (!products.length) return null;

  return (
    <div className={className}>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {products.map((product) => (
          <li key={product.id} className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
            <ProductCard 
              product={product}
              className="aspect-square w-full"
              imageClassName="h-full w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
