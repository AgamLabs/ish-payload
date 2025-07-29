import React from "react";
import { Price } from "@/components/Price";
import type { PriceDisplayProps } from "./types";

export function PriceDisplay({ 
  price, 
  currency, 
  variantId 
}: PriceDisplayProps) {
  return (
    <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
      <Price 
        key={variantId || 'default'} 
        amount={price} 
        currencyCode={currency} 
      />
    </div>
  );
}
