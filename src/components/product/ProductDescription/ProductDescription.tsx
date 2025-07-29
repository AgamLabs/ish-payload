"use client";

import React, { Suspense } from "react";
import type { Product } from "@/payload-types";
import RichText from "@/components/RichText";
import { AddToCart } from "@/components/Cart/AddToCart";
import { VariantSelector } from "../VariantSelector";
import { Breadcrumbs } from "../Breadcrumbs";
import { useProductPricing } from "./useProductPricing";
import { PriceDisplay } from "./PriceDisplay";
import { ProductHeader } from "./ProductHeader";
import { extractCategoryData } from "./utils";

export function ProductDescription({ product }: { product: Product }) {
  const currency = "INR";
  
  // Custom hook handles all pricing logic
  const { currentPrice, variantId } = useProductPricing(product);
  
  // Extract category data
  const categoryData = extractCategoryData(product);

  // Render price component
  const priceComponent = (
    <PriceDisplay 
      price={currentPrice}
      currency={currency}
      variantId={variantId}
    />
  );

  return (
    <React.Fragment>
      <Breadcrumbs 
        category={categoryData} 
        productTitle={product.title} 
      />
      
      <ProductHeader 
        title={product.title}
        priceComponent={priceComponent}
      />

      <Suspense fallback={null}>
        <VariantSelector product={product} />
      </Suspense>

      <Suspense fallback={null}>
        <AddToCart
          product={product}
          variants={product.variants?.variants || []}
        />
      </Suspense>

      {product.description && (
        <RichText
          className="mb-6"
          data={product.description}
          enableGutter={false}
        />
      )}
    </React.Fragment>
  );
}
