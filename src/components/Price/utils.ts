import type { FormatCurrencyOptions } from "./types";

/**
 * Default formatting options for currency display
 */
const DEFAULT_FORMAT_OPTIONS: Partial<FormatCurrencyOptions> = {
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

/**
 * Formats a number as currency using Intl.NumberFormat
 */
export function formatCurrency(
  amount: number, 
  currency: string, 
  options: Partial<FormatCurrencyOptions> = {}
): string {
  const formatOptions = {
    ...DEFAULT_FORMAT_OPTIONS,
    ...options,
    currency,
    style: 'currency' as const,
  };

  return new Intl.NumberFormat(undefined, formatOptions).format(amount);
}

/**
 * Determines if a price should be displayed as a range
 */
export function shouldDisplayAsRange(
  lowestAmount?: number, 
  highestAmount?: number
): boolean {
  return Boolean(
    lowestAmount && 
    highestAmount && 
    lowestAmount !== highestAmount
  );
}

/**
 * Validates price props to ensure only one price type is provided
 */
export function validatePriceProps(
  amount?: number,
  lowestAmount?: number,
  highestAmount?: number
): { isValid: boolean; error?: string } {
  const hasFixedPrice = amount !== undefined;
  const hasRangePrice = lowestAmount !== undefined || highestAmount !== undefined;

  if (hasFixedPrice && hasRangePrice) {
    return {
      isValid: false,
      error: "Cannot provide both fixed amount and price range"
    };
  }

  if (!hasFixedPrice && !hasRangePrice) {
    return {
      isValid: false,
      error: "Must provide either amount or price range"
    };
  }

  if (hasRangePrice && (!lowestAmount || !highestAmount)) {
    return {
      isValid: false,
      error: "Price range requires both lowestAmount and highestAmount"
    };
  }

  return { isValid: true };
}
