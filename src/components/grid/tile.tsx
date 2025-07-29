'use client'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { Label } from '@/components/Label'
import clsx from 'clsx'
import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react'

export function GridTileImage({
  active,
  isInteractive = true,
  label,
  showCartOnHover = false,
  onAddToCart,
  ...props
}: {
  active?: boolean
  isInteractive?: boolean
  showCartOnHover?: boolean
  onAddToCart?: () => void
  label?: {
    amount: number
    currencyCode: string
    position?: 'bottom' | 'center'
    title: string
  }
  media: MediaType
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600',
        {
          'border-2 border-blue-600': active,
          'border-neutral-200': !active,
          relative: label || showCartOnHover,
        },
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.media ? (
         
        <Media
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
          })}
          height={80}
          imgClassName="h-full w-full object-cover"
          resource={props.media}
          width={80}
        />
      ) : null}

      {/* Cart Icon Overlay */}
      {showCartOnHover && onAddToCart && (
        <div
          className={`
            absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white hover:bg-gray-100 text-black rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      )}

      {label ? (
        <Label
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          title={label.title}
        />
      ) : null}
    </div>
  )
}
