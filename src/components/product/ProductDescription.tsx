"use client";

import type { Product } from "@/payload-types";

import RichText from "@/components/RichText";
import { AddToCart } from "@/components/Cart/AddToCart";
import { Price } from "@/components/Price";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { VariantSelector } from "./VariantSelector";
import { Breadcrumbs } from "./Breadcrumbs";

export function ProductDescription({ product }: { product: Product }) {
  const currency = "INR";
  const searchParams = useSearchParams();
  const [currentVariantId, setCurrentVariantId] = useState<string | null>(null);

  // Update state when search params change
  useEffect(() => {
    const variantId = searchParams.get("variant");
    const thickness = searchParams.get("thickness");
    const width = searchParams.get("width");
    
    setCurrentVariantId(variantId);
  }, [searchParams]);

  const hasVariants =
    product.enableVariants && product.variants?.variants?.length;

  // Calculate current price directly without useMemo
  let currentPrice = product.price || 0;

  // If there's a variant selected, use its price
  if (hasVariants && currentVariantId) {
    const selectedVariant = product.variants?.variants?.find(
      (v) => v.id === currentVariantId
    );
    
    if (selectedVariant) {
      currentPrice = selectedVariant.price;
    }
  }
  
  // If no variant ID but we have thickness/width parameters, try to match variant
  if (hasVariants && !currentVariantId && product.variants?.variants) {
    const thickness = searchParams.get("thickness");
    const width = searchParams.get("width");
    
    if (thickness && width) {
      // Find matching variant based on thickness and width
      const matchingVariant = product.variants.variants.find(variant => {
        // Check if options is an array (new format)
        if (Array.isArray(variant.options)) {
          // Check if we have exactly 2 options (thickness and width)
          if (variant.options.length !== 2) {
            return false;
          }
          
          // Get the option values (labels)
          const variantValues = variant.options.map(opt => opt.label);
          
          // Check if both thickness and width values exist in variant values
          const hasThickness = variantValues.includes(thickness);
          const hasWidth = variantValues.includes(width);
          
          return hasThickness && hasWidth;
        } else {
          return false;
        }
      });
      
      if (matchingVariant) {
        currentPrice = matchingVariant.price;
      }
    }
  }

  // If no variant is selected but variants exist, use the first variant's price
  if (hasVariants && !currentVariantId && product.variants?.variants?.length) {
    const thickness = searchParams.get("thickness");
    const width = searchParams.get("width");
    
    // Only use first variant price if no thickness/width params
    if (!thickness && !width) {
      currentPrice = product.variants.variants[0].price;
    }
  }

  // Get first category if available and populated
  let categoryData: { slug: string; name: string } | undefined = undefined;
  if (product.categories && product.categories.length > 0) {
    const cat = product.categories[0];
    if (typeof cat === "object" && "slug" in cat && "title" in cat) {
      categoryData = { slug: cat.slug, name: cat.title };
    }
  }

  return (
    <React.Fragment>
      <Breadcrumbs category={categoryData} productTitle={product.title} />
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price 
            key={currentVariantId || 'default'} 
            amount={currentPrice} 
            currencyCode={currency} 
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector product={product} />
      </Suspense>

      <Suspense fallback={null}>
        <AddToCart
          product={product}
          variants={product.variants?.variants || []}
        />
      </Suspense>

      {product.description ? (
        <RichText
          className="mb-6"
          data={product.description}
          enableGutter={false}
        />
      ) : null}
    </React.Fragment>
  );
}
