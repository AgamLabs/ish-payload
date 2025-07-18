import React from 'react'

type BaseProps = {
  className?: string
  currencyCode: string
  currencyCodeClassName?: string
}

type PriceFixed = {
  amount: number
  highestAmount?: never
  lowestAmount?: never
}

type PriceRange = {
  amount?: never
  highestAmount: number
  lowestAmount: number
}

type Props = BaseProps & (PriceFixed | PriceRange)

export const Price = ({
  amount,
  className,
  currencyCode = 'INR',
  highestAmount,
  lowestAmount,
}: Props & React.ComponentProps<'p'>) => {
  if (amount) {
    return (
      <p className={className} suppressHydrationWarning>
        {`${new Intl.NumberFormat(undefined, {
          currency: currencyCode,
          currencyDisplay: 'narrowSymbol',
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount)}`}
      </p>
    )
  }

  if (highestAmount && highestAmount !== lowestAmount) {
    return (
      <p className={className} suppressHydrationWarning>
        {`${new Intl.NumberFormat(undefined, {
          currency: currencyCode,
          currencyDisplay: 'narrowSymbol',
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(lowestAmount)} - ${new Intl.NumberFormat(undefined, {
          currency: currencyCode,
          currencyDisplay: 'narrowSymbol',
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(highestAmount)}`}
      </p>
    )
  }

  if (lowestAmount) {
    return (
      <p className={className} suppressHydrationWarning>
        {`${new Intl.NumberFormat(undefined, {
          currency: currencyCode,
          currencyDisplay: 'narrowSymbol',
          style: 'currency',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(lowestAmount)}`}
      </p>
    )
  }

  return null
}
