import React from "react";
import type { PriceRangeProps } from "./types";
import { formatCurrency, shouldDisplayAsRange } from "./utils";

export function PriceRange({ 
  lowestAmount, 
  highestAmount, 
  currencyCode, 
  className,
  ...restProps 
}: PriceRangeProps) {
  // If amounts are equal, display as single price
  if (!shouldDisplayAsRange(lowestAmount, highestAmount)) {
    const formattedPrice = formatCurrency(lowestAmount, currencyCode);
    return (
      <p className={className} suppressHydrationWarning {...restProps}>
        {formattedPrice}
      </p>
    );
  }

  // Display as range
  const formattedLow = formatCurrency(lowestAmount, currencyCode);
  const formattedHigh = formatCurrency(highestAmount, currencyCode);

  return (
    <p className={className} suppressHydrationWarning {...restProps}>
      {formattedLow} - {formattedHigh}
    </p>
  );
}
