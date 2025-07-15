import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Footer } from './index'
import { cache } from 'react'

// Cache the footer data fetching function to prevent duplicate calls
const getFooterData = cache(async (): Promise<FooterType> => {
  return await getCachedGlobal('footer', 1)()
})

export async function FooterWrapper() {
  // Use React cache + Next.js unstable_cache for maximum performance
  const footerData = await getFooterData()
  
  return <Footer footerData={footerData} />
}
