import React from "react";
import type { FixedPriceProps } from "./types";
import { formatCurrency } from "./utils";

export function FixedPrice({ 
  amount, 
  currencyCode, 
  className,
  ...restProps 
}: FixedPriceProps) {
  const formattedPrice = formatCurrency(amount, currencyCode);

  return (
    <p className={className} suppressHydrationWarning {...restProps}>
      {formattedPrice}
    </p>
  );
}
