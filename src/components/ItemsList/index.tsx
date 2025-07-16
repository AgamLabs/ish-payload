import type { InfoType } from '@/collections/Products/ui/types'
import type { CartItems } from '@/payload-types'

import { Price } from '@/components/Price'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// At the top of the file with other imports
import type { Media, Product } from '@/payload-types'
interface Props {
  items: CartItems
}

export const ItemsList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="flex-grow overflow-auto py-4">
      {items?.map((item, _i) => {
        if (typeof item.product === 'string' || !item) return <React.Fragment key={item.id} />

        const product = item.product
        const _image =
          typeof product === 'object' && product?.meta?.image && typeof product?.meta?.image !== 'string'
            ? product.meta.image
            : undefined

        const isVariant = Boolean(item.variant)
        const variant = typeof product === 'object' && product?.variants?.variants?.length
          ? product.variants.variants.find((v) => v.id === item.variant)
          : undefined

       // In src/components/ItemsList/index.tsx
const info = isVariant 
? (variant as unknown as { info?: InfoType })?.info
: (product as unknown as { info?: InfoType })?.info;
// At the top of the component function
let media: { url: string | null | undefined; alt: string | null | undefined } | undefined;
      // In src/components/ItemsList/index.tsx lines 33-39
if (isVariant) {
  const firstImage = variant?.images?.[0] as Media | undefined
  if (firstImage && typeof firstImage !== 'string') {
    media = {
      url: firstImage.url,
      alt: firstImage.alt
    }
  }
} else {
  const firstImage = (product as Product & { images?: Media[] })?.images?.[0]
  if (firstImage && typeof firstImage !== 'string') {
    media = {
      url: firstImage.url,
      alt: firstImage.alt
    }
  }
}

        const url = `/product/${typeof product === 'object' ? product?.slug : ''}${isVariant ? `?variant=${item.variant}` : ''}`

        return (
          <li
            className="flex w-full flex-col border-b border-neutral-300"
            key={item.id}
          >
            <div className="relative flex w-full flex-row justify-between px-1 py-4">
              <Link className="z-30 flex flex-row space-x-4" href={url}>
                <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                  {media?.url && (
                    <Image
                      alt={media.alt || (typeof product === 'object' ? product?.title : '') || ''}
                      className="h-full w-full object-cover"
                      height={64}
                      src={media.url}
                      width={64}
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col text-base">
                  <span className="leading-tight">{typeof product === 'object' ? product?.title : ''}</span>
                  {isVariant && info?.options?.length ? (
                    <p className="text-sm text-neutral-500">
                      {info.options
                        ?.map((option) => {
                          return option.label
                        })
                        .join(', ')}
                    </p>
                  ) : null}
                </div>
              </Link>
              <div className="flex h-16 flex-col justify-between">
                {info?.price && (
                  <Price
                    amount={info.price?.amount}
                    className="flex justify-end space-y-2 text-right text-sm"
                    currencyCode={info.price?.currency}
                  />
                )}
                <p>{item.quantity}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
