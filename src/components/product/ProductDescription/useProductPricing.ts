import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import type { Product } from "@/payload-types";
import type { VariantSelection, PriceCalculationResult } from "./types";
import { calculateCurrentPrice, extractVariantSelections } from "./utils";

export function useProductPricing(product: Product) {
  const searchParams = useSearchParams();
  const [currentVariantId, setCurrentVariantId] = useState<string | null>(null);

  // Extract variant selections from URL
  const variantSelections = useMemo(() => 
    extractVariantSelections(searchParams, product.variants?.options),
    [searchParams, product.variants?.options]
  );

  // Update variant ID when search params change
  useEffect(() => {
    const variantId = searchParams.get("variant");
    setCurrentVariantId(variantId);
  }, [searchParams]);

  // Calculate current price
  const priceResult = useMemo(() => 
    calculateCurrentPrice(product, currentVariantId, variantSelections),
    [product, currentVariantId, variantSelections]
  );

  return {
    currentPrice: priceResult.currentPrice,
    selectedVariant: priceResult.selectedVariant,
    variantId: currentVariantId,
    variantSelections,
    isFallbackPrice: priceResult.fallbackUsed
  };
}
