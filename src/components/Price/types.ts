export interface BasePriceProps {
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
}

export interface FixedPriceProps extends BasePriceProps {
  amount: number;
  highestAmount?: never;
  lowestAmount?: never;
}

export interface PriceRangeProps extends BasePriceProps {
  amount?: never;
  highestAmount: number;
  lowestAmount: number;
}

export type PriceProps = (FixedPriceProps | PriceRangeProps) & React.ComponentProps<'p'>;

export interface FormatCurrencyOptions {
  currency: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  currencyDisplay?: 'narrowSymbol' | 'symbol' | 'code';
}
