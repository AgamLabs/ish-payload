// Product page constants
export const CURRENCY_CODE = "INR" as const;
export const PRODUCT_COLLECTION = "products" as const;
export const QUERY_DEPTH = 2 as const;

// CSS classes for better maintainability
export const CSS_CLASSES = {
  container: "container",
  productLayout: "flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:py-12 lg:flex-row lg:gap-8",
  descriptionSection: "basis-full lg:basis-2/6",
} as const;
