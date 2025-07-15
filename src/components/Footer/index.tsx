"use client";

import type { Footer as FooterType } from '@/payload-types'

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
import Link from 'next/link'
import Image from "next/image";
import React, { memo } from 'react'

const { COMPANY_NAME, SITE_NAME } = process.env

interface FooterProps {
  footerData?: FooterType;
}

export const Footer = memo(function Footer({ footerData }: FooterProps) {
  const menu = footerData?.navItems || []
  // Fix hydration issue by using a static year or server-side only
  const currentYear = 2025 // or process.env.BUILD_YEAR || new Date().getFullYear()
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '')
  
  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className="relative text-sm text-white w-full pt-8 min-h-[270px] bg-[#003366]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 pb-8 w-full">
          {/* Logo & Address */}
          <div className="flex-1 min-w-[220px] flex flex-col items-start mt-2">
            <div className="mb-3">
              <Image 
                src="/media/logo/footer_logo.png" 
                alt="India Steel Hub Logo" 
                width={180} 
                height={40} 
                className="mb-2"
                priority={false}
                loading="lazy"
              />
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
              <a href="#" aria-label="Facebook" className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition">
                <Facebook sx={{ color: '#003366', fontSize: 16 }} />
              </a>
              <a href="#" aria-label="LinkedIn" className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition">
                <LinkedIn sx={{ color: '#003366', fontSize: 16 }} />
              </a>
              <a href="#" aria-label="Instagram" className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition">
                <Instagram sx={{ color: '#003366', fontSize: 16 }} />
              </a>
              <a href="#" aria-label="YouTube" className="bg-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition">
                <YouTube sx={{ color: '#003366', fontSize: 16 }} />
              </a>
            </div>
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
})