import Link from 'next/link'
import React from 'react'

interface BreadcrumbsProps {
  category?: { slug: string; name: string }
  productTitle: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, productTitle }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        </li>
        {category && (
          <li>
            <span className="mx-2">/</span>
            <Link href={`/search/${category.slug}`} className="text-blue-600 hover:underline">
              {category.name}
            </Link>
          </li>
        )}
        <li>
          <span className="mx-2">/</span>
          <span className="text-gray-500">{productTitle}</span>
        </li>
      </ol>
    </nav>
  )
}
