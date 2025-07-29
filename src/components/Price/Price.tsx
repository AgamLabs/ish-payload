import React from "react";
import type { PriceProps } from "./types";
import { FixedPrice } from "./FixedPrice";
import { PriceRange } from "./PriceRange";
import { validatePriceProps } from "./utils";

export const Price = (props: PriceProps) => {
  const { amount, lowestAmount, highestAmount, currencyCode = 'INR' } = props;

  // Validate props in development
  if (process.env.NODE_ENV === 'development') {
    const validation = validatePriceProps(amount, lowestAmount, highestAmount);
    if (!validation.isValid) {
      console.warn(`Price component validation error: ${validation.error}`);
      return null;
    }
  }

  // Render fixed price
  if (amount !== undefined) {
    return (
      <FixedPrice 
        {...props as any}
        amount={amount}
        currencyCode={currencyCode}
      />
    );
  }

  // Render price range
  if (lowestAmount !== undefined && highestAmount !== undefined) {
    return (
      <PriceRange 
        {...props as any}
        lowestAmount={lowestAmount}
        highestAmount={highestAmount}
        currencyCode={currencyCode}
      />
    );
  }

  return null;
};
