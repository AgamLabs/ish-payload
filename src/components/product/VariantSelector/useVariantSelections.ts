import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { VariantSelections, Variant } from "./types";
import { createUrl } from "@/utilities/createUrl";
import { findMatchingVariant, shouldSetVariant } from "./utils";

export function useVariantSelections(
  variantGroups: { slug: string }[] | undefined,
  variants: Variant[] | undefined
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current selections from URL params
  const currentSelections: VariantSelections = useMemo(() => {
    if (!variantGroups) return {};
    
    const selections: VariantSelections = {};
    variantGroups.forEach(group => {
      const value = searchParams.get(group.slug.toLowerCase());
      if (value) {
        selections[group.slug] = value;
      }
    });
    return selections;
  }, [searchParams, variantGroups]);

  // Update URL with new selection
  const updateSelection = useCallback((optionGroupSlug: string, optionSlug: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    // Remove image and variant ID when making new selection
    newParams.delete("variant");
    newParams.delete("image");
    
    // Set the new option selection
    newParams.set(optionGroupSlug.toLowerCase(), optionSlug);
    
    // Calculate new selections
    const newSelections = { ...currentSelections, [optionGroupSlug]: optionSlug };
    
    // Find matching variant if conditions are met
    if (variants && variantGroups) {
      const isSingleOption = variantGroups.length === 1;
      
      if (shouldSetVariant(newSelections, variantGroups.length, isSingleOption)) {
        const matchingVariant = findMatchingVariant(variants, newSelections, isSingleOption);
        if (matchingVariant?.id) {
          newParams.set("variant", matchingVariant.id);
        }
      }
    }
    
    const newUrl = createUrl(pathname, newParams);
    router.replace(newUrl, { scroll: false });
  }, [searchParams, currentSelections, variants, variantGroups, pathname, router]);

  return {
    currentSelections,
    updateSelection
  };
}
