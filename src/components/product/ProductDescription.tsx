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
    
    // Get all variant option parameter names
    const variantParams: Record<string, string> = {};
    if (product.variants?.options) {
      product.variants.options.forEach((option) => {
        const paramValue = searchParams.get(option.slug.toLowerCase());
        if (paramValue) {
          variantParams[option.slug.toLowerCase()] = paramValue;
        }
      });
    }
    
    setCurrentVariantId(variantId);
  }, [searchParams, product.variants?.options]);

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
  
  // If no variant ID but we have variant parameters, try to match variant
  if (hasVariants && !currentVariantId && product.variants?.variants && product.variants?.options) {
    // Get all current variant parameter selections
    const variantSelections: Record<string, string> = {};
    product.variants.options.forEach((option) => {
      const paramValue = searchParams.get(option.slug.toLowerCase());
      if (paramValue) {
        variantSelections[option.slug.toLowerCase()] = paramValue;
      }
    });
    
    // Only try to match if we have selections
    if (Object.keys(variantSelections).length > 0) {
      // Find matching variant based on current selections
      const matchingVariant = product.variants.variants.find(variant => {
        if (!Array.isArray(variant.options)) return false;
        
        // For single option products, match immediately
        if (product.variants != null && product.variants.options.length === 1) {
          const selectedValue = Object.values(variantSelections)[0];
          return variant.options.some(opt => 
            opt.slug === selectedValue || opt.label === selectedValue
          );
        }
        
        // For multiple options, check if all selections match this variant
        return Object.entries(variantSelections).every(([paramKey, selectedValue]) => {
          return variant.options.some(opt => 
            opt.slug === selectedValue || opt.label === selectedValue
          );
        });
      });
      
      if (matchingVariant) {
        currentPrice = matchingVariant.price;
      }
    }
  }

  // If no variant is selected but variants exist, use the first variant's price
  if (hasVariants && !currentVariantId && product.variants?.variants?.length) {
    // Check if we have any variant parameter selections
    const hasAnyVariantParams = product.variants.options?.some((option) => 
      searchParams.get(option.slug.toLowerCase())
    );
    
    // Only use first variant price if no variant params are selected
    if (!hasAnyVariantParams) {
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
