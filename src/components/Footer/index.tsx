import type { Footer } from '@/payload-types'

import {
  Facebook,
  LinkedIn,
  Instagram,
  YouTube,
  Android,
  Apple,
} from "@mui/icons-material";
import { FooterMenu } from '@/components/Footer/menu'
import { LogoSquare } from '@/components/LogoSquare'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from "next/image";
import React, { Suspense } from 'react'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '')
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'

  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className="relative text-sm text-white w-full pt-8 min-h-[270px] bg-[url('/media/footer_bg.avif')] bg-cover bg-center">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[#000b3a]/90 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 pb-8 w-full">
          {/* Logo & Address */}
          <div className="flex-1 min-w-[220px] flex flex-col items-start mt-2">
            <div className="mb-3">
              <Image src="/media/logo/companylogo.png" alt="Hashtag Steel Logo" width={180} height={40} className="mb-2" />
            </div>
            <div className="text-sm leading-relaxed mb-2 text-white">
              AC 5, 2nd Ave, AC Block, Anna Nagar,<br />
              Chennai, Tamil Nadu 600040
            </div>
            <div className="mb-2 text-sm text-white">
              <span className="font-semibold">1800 309 3099</span> or <br />
              <a href="mailto:info@indiasteelhub.com" className="underline text-white">info@indiasteelhub.com</a>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3 mb-3 mt-1">
              <a href="#" aria-label="Facebook" className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition"><Facebook sx={{ color: '#000b3a' }} fontSize="small" /></a>
              <a href="#" aria-label="LinkedIn" className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition"><LinkedIn sx={{ color: '#000b3a' }} fontSize="small" /></a>
              <a href="#" aria-label="Instagram" className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition"><Instagram sx={{ color: '#000b3a' }} fontSize="small" /></a>
              <a href="#" aria-label="YouTube" className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition"><YouTube sx={{ color: '#000b3a' }} fontSize="small" /></a>
            </div>
            {/* App Download */}
            {/* <div className="flex gap-3 mt-2">
              <a href="#" aria-label="Google Play" className="bg-white rounded flex items-center px-2 py-1 text-xs font-semibold text-[#000b3a] border border-white hover:bg-blue-700 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 48 48"><path fill="#000b3a" d="M9.2 6.6c-1.3 0-2.4 1.1-2.4 2.4v30c0 1.3 1.1 2.4 2.4 2.4.6 0 1.2-.2 1.7-.6l20.6-15.2-20.6-15.2c-.5-.4-1.1-.6-1.7-.6zm3.8 2.3l17.7 13.1-5.2 3.8-12.5-16.9zm18.8 13.9l5.2 3.8-17.7 13.1 12.5-16.9zm6.4 4.7l-5.2 3.8 5.2 3.8v-7.6z" /></svg>
                <span className="ml-1">Google Play</span>
              </a>
              <a href="#" aria-label="App Store" className="bg-white rounded flex items-center px-2 py-1 text-xs font-semibold text-[#000b3a] border border-white hover:bg-blue-700 hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 48 48"><path fill="#000b3a" d="M34.1 24.3c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-8.1 12.7c0-1.5 1.2-2.7 2.7-2.7h10.6c1.5 0 2.7 1.2 2.7 2.7v3.3c0 1.5-1.2 2.7-2.7 2.7H28.7c-1.5 0-2.7-1.2-2.7-2.7v-3.3z" /></svg>
                <span className="ml-1">App Store</span>
              </a>
            </div> */}
          </div>

          {/* Navigation Links */}
          <div className="flex-1 min-w-[220px] flex flex-col items-center md:items-start justify-center">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex flex-col gap-2">
                <Link href="/" className="hover:underline text-white">Home</Link>
                <Link href="/about" className="hover:underline text-white">About Us</Link>
                <Link href="/enquiry" className="hover:underline text-white">Enquiry</Link>
                <Link href="/contact" className="hover:underline text-white">Contact Us</Link>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/faq" className="hover:underline text-white">FAQ</Link>
                <Link href="/blog" className="hover:underline text-white">Blog</Link>
                <Link href="/become-seller" className="hover:underline text-white">Become a Seller</Link>
              </div>
            </div>
          </div>

          {/* Newsletter Sign-up */}
          {/* <div className="flex-1 min-w-[260px] flex flex-col items-center md:items-end mt-4 md:mt-0">
            <div className="w-full max-w-xs">
              <h3 className="font-semibold mb-1 text-white">Newsletter Sign-up</h3>
              <p className="text-xs mb-2 text-white">Sign-up to get the latest update</p>
              <form className="flex flex-col gap-2">
                <input type="text" placeholder="Enter Name" className="px-3 py-2 rounded-full bg-white text-[#000b3a] placeholder:text-gray-500 border border-white focus:outline-none" />
                <input type="email" placeholder="Enter Mail" className="px-3 py-2 rounded-full bg-white text-[#000b3a] placeholder:text-gray-500 border border-white focus:outline-none" />
                <button type="submit" className="rounded-full border border-[#fff] bg-white text-[#000b3a] font-semibold py-2 mt-1 transition hover:bg-[#000b3a] hover:text-white">Keep me posted</button>
              </form>
            </div>
          </div> */}
        </div>
        {/* Divider line */}
        <div className="h-[2px] w-full bg-white/80 my-6"></div>
        {/* Bottom legal/copyright */}
        <div className="py-2 flex flex-col md:flex-row items-center justify-between text-xs text-white w-full">
          <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
            <Link href="/legal" className="hover:underline text-white">Legal Policies</Link>
            <span>/</span>
            <Link href="/terms" className="hover:underline text-white">Terms &amp; Conditions</Link>
          </div>
          <div>
            &copy; {currentYear} India Steel Hub Private Limited.
          </div>
        </div>
      </div>
    </footer>
  )
}


{/* <div className="container">
        <div className="flex w-full flex-col gap-6 border-t border-neutral-200 py-12 text-sm md:flex-row md:gap-12 dark:border-neutral-700">
          <div>
            <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
              <LogoSquare size="sm" />
              <span className="uppercase">{SITE_NAME}</span>
            </Link>
          </div>
          <Suspense
            fallback={
              <div className="flex h-[188px] w-[200px] flex-col gap-2">
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
              </div>
            }
          >
            <FooterMenu menu={menu} />
          </Suspense>
          <div className="md:ml-auto">
            <a
              aria-label="Deploy on Vercel"
              className="flex mb-4 h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
              href="https://vercel.com/templates/next.js/nextjs-commerce"
            >
              <span className="px-3">▲</span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              <span className="px-3">Deploy</span>
            </a>
            <ThemeSelector />
          </div>
        </div>
      </div> */}
{/* <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="container mx-auto flex w-full flex-col items-center gap-1 md:flex-row md:gap-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in India</p>
          <p className="md:ml-auto text-black dark:text-white">
            <a className="text-black dark:text-white" href="https://payloadcms.com">
              Crafted by ▲ AgamLabs
            </a>
          </p>
        </div>
      </div> */}