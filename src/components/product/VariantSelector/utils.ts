import type { Variant, VariantSelections, VariantOption } from "./types";

/**
 * Finds the best matching variant based on current selections
 */
export function findMatchingVariant(
  variants: Variant[],
  selections: VariantSelections,
  isSingleOption: boolean
): Variant | undefined {
  return variants.find(variant => {
    if (isSingleOption) {
      return findSingleOptionMatch(variant, selections);
    }
    return findMultiOptionMatch(variant, selections);
  });
}

/**
 * Matches variant for single option products
 */
function findSingleOptionMatch(variant: Variant, selections: VariantSelections): boolean {
  const selectedValue = Object.values(selections)[0];
  if (!selectedValue) return false;
  
  return variant.options.some(opt => 
    opt.slug === selectedValue || opt.label === selectedValue
  );
}

/**
 * Matches variant for multi-option products
 */
function findMultiOptionMatch(variant: Variant, selections: VariantSelections): boolean {
  return Object.entries(selections).every(([key, value]) => {
    return variant.options.some(opt => 
      opt.slug === value || opt.label === value
    );
  });
}

/**
 * Filters available options based on previous selections
 */
export function getAvailableOptions(
  optionGroup: { values: VariantOption[] },
  variants: Variant[],
  previousSelections: VariantSelections
): VariantOption[] {
  // If no previous selections, show all options
  if (Object.keys(previousSelections).length === 0) {
    return optionGroup.values || [];
  }

  // Filter options that are available in variants matching previous selections
  const matchingVariants = variants.filter(variant =>
    Object.entries(previousSelections).every(([key, value]) =>
      variant.options.some(opt => opt.slug === value || opt.label === value)
    )
  );

  return (optionGroup.values || []).filter(option =>
    matchingVariants.some(variant =>
      variant.options.some(opt => 
        opt.slug === option.slug || 
        opt.label === option.label || 
        opt.id === option.id
      )
    )
  );
}

/**
 * Checks if a variant is available for sale
 */
export function isVariantAvailable(variant: Variant | undefined): boolean {
  return Boolean(variant?.id && variant.stock > 0);
}

/**
 * Determines if variant should be set based on current selections
 */
export function shouldSetVariant(
  selections: VariantSelections,
  totalOptionGroups: number,
  isSingleOption: boolean
): boolean {
  const hasSelections = Object.keys(selections).length > 0;
  
  if (!hasSelections) return false;
  
  // For single option products, set variant immediately
  if (isSingleOption) return true;
  
  // For multi-option products, require all options to be selected
  return Object.keys(selections).length === totalOptionGroups;
}
