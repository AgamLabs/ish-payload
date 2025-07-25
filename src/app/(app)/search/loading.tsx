import { Grid } from '@/components/grid'
import React from 'react'

export default function Loading() {
  return (
    <Grid className="grid-cols-2 lg:grid-cols-3">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <Grid.Item className="animate-pulse bg-neutral-100" key={index} />
          )
        })}
    </Grid>
  )
}
