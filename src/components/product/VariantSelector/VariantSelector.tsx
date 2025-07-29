"use client";

import React from "react";
import type { Product } from "@/payload-types";
import type { Variant, VariantGroup, VariantSelections } from "./types";
import { OptionGroup } from "./OptionGroup";
import { useVariantSelections } from "./useVariantSelections";
import { getAvailableOptions } from "./utils";

export function VariantSelector({ product }: { product: Product }) {
  // Type-safe data extraction
  const variants = (product.variants?.variants as Variant[]) || [];
  const variantGroups = (product.variants?.options as VariantGroup[]) || [];
  
  // Early return if no variants configured
  const hasVariants = Boolean(
    product.enableVariants && variants.length && variantGroups.length
  );

  if (!hasVariants) {
    return null;
  }

  // Custom hook for managing selections
  const { currentSelections, updateSelection } = useVariantSelections(
    variantGroups,
    variants
  );

  // Render each option group
  return (
    <>
      {variantGroups.map((optionGroup, index) => {
        // Get previous selections (for dependency filtering)
        const previousSelections: VariantSelections = {};
        for (let i = 0; i < index; i++) {
          const prevGroup = variantGroups[i];
          const selection = currentSelections[prevGroup.slug];
          if (selection) {
            previousSelections[prevGroup.slug] = selection;
          }
        }

        // Get available options based on previous selections
        const availableOptions = getAvailableOptions(
          optionGroup,
          variants,
          previousSelections
        );

        // Get current selection for this group
        const selectedValue = currentSelections[optionGroup.slug];

        return (
          <OptionGroup
            key={optionGroup.slug}
            optionGroup={optionGroup}
            availableOptions={availableOptions}
            selectedValue={selectedValue}
            variants={variants}
            currentSelections={currentSelections}
            onOptionSelect={(optionSlug) => updateSelection(optionGroup.slug, optionSlug)}
          />
        );
      })}
    </>
  );
}
