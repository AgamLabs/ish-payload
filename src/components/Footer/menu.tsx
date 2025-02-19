import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import React from 'react'

interface Props {
  menu: Footer['navItems']
}

export function FooterMenu({ menu }: Props) {
  if (!menu?.length) return null

  return (
    <nav>
      <ul>
        {menu.map((item) => {
          return (
            <li key={item.id}>
              <CMSLink appearance="link" {...{
                ...item.link,
                reference: item.link.reference ? {
                  ...item.link.reference,
                  value: typeof item.link.reference.value === 'number' ? String(item.link.reference.value) : item.link.reference.value
                } : null
              }} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
