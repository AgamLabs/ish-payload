import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Product } from '@/payload-types' // Using Product instead of Post since this is an e-commerce template

import { ProductGridItems } from '@/components/layout/ProductGridItems'

export type RelatedProductsProps = {
  className?: string
  docs?: Product[]
  introContent?: any
}

export const RelatedPosts: React.FC<RelatedProductsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        <ProductGridItems products={docs || []} />
      </div>
    </div>
  )
}
