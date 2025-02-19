'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import React, { useEffect, useState } from 'react'

import type { OptionKey } from '../types'

export const KeyLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<OptionKey>()
  const [label, setLabel] = useState(`Key ${rowNumber}`)

  useEffect(() => {
    const productData = data as { label: string; values?: Array<{ label: string }> }
    if (productData.label) {
      const values = productData.values?.map((v) => v.label) || []
      setLabel([productData.label, ...values].join(' - '))
    }
  }, [data])

  return (
    <div>
      <span>{label}</span>
    </div>
  )
}
