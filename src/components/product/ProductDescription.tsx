import type { Product } from '@/payload-types'

import RichText from '@/components/RichText'
import { AddToCart } from '@/components/Cart/AddToCart'
import { Price } from '@/components/Price'
import React, { Suspense } from 'react'

import { VariantSelector } from './VariantSelector'
import { Breadcrumbs } from './Breadcrumbs'

export function ProductDescription({ product }: { product: Product }) {
  const currency = 'INR'
  let amount = 0,
    lowestAmount = 0,
    highestAmount = 0

  const hasVariants = product.enableVariants && product.variants?.variants?.length

  if (hasVariants) {
    const variantsOrderedByPrice = product.variants?.variants?.sort((a, b) => {
      return a.price - b.price
    })

    if (variantsOrderedByPrice) {
      lowestAmount = variantsOrderedByPrice[0].price
      highestAmount = variantsOrderedByPrice[variantsOrderedByPrice.length - 1].price
    }
  } else if (product.price) {
    amount = product.price
  }

  // Get first category if available and populated
  let categoryData: { slug: string; name: string } | undefined = undefined
  if (product.categories && product.categories.length > 0) {
    const cat = product.categories[0]
    if (typeof cat === 'object' && 'slug' in cat && 'title' in cat) {
      categoryData = { slug: cat.slug, name: cat.title }
    }
  }

  return (
    <React.Fragment>
      <Breadcrumbs
        category={categoryData}
        productTitle={product.title}
      />
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          {hasVariants ? (
            <Price
              currencyCode={currency}
              highestAmount={highestAmount}
              lowestAmount={lowestAmount}
            />
          ) : (
            <Price amount={amount} currencyCode={currency} />
          )}
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector product={product} />
      </Suspense>

      <Suspense fallback={null}>
        <AddToCart product={product} variants={product.variants?.variants || []} />
      </Suspense>

      {product.description ? (
        <RichText className="mb-6" data={product.description} enableGutter={false} />
      ) : null}
    </React.Fragment>
  )
}
