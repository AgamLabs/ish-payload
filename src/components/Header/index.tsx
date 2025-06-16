import { CMSLink } from "@/components/Link";
import { Cart } from "@/components/Cart";
import { OpenCart } from "@/components/Cart/OpenCart";
import { LogoSquare } from "@/components/LogoSquare";
import Link from "next/link";
import React, { Suspense } from "react";
import { MobileMenu } from "./mobile-menu";
import { Search, SearchSkeleton } from "./search";
import type { Header } from "src/payload-types";
import AccountDrawer from "@/components/AccountDrawer";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { ShoppingCart, User } from "lucide-react";

export async function Header() {
  const header: Header = await getCachedGlobal("header", 1)();
  const menu = header.navItems || [];

  return (
    <Suspense>
      <header className="relative z-20">
        {/* Top Bar */}
        <div className="bg-white py-4 relative">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="z-10">
                <LogoSquare />
              </Link>

              {/* Search - Hidden on mobile, shown on md and up */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-4">
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-[#003366] text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Mobile Menu */}
              <div className="block md:hidden">
                <Suspense fallback={<div>Loading...</div>}>
                  <MobileMenu menu={menu} />
                </Suspense>
              </div>

              {/* Main Navigation */}
              <ul className="hidden md:flex items-center space-x-8 text-sm font-medium h-full">
                {menu.length
                  ? menu.map((item) => (
                      <li key={item.id} className="h-full flex items-center">
                        <CMSLink
                          {...{
                            ...item.link,
                            reference: item.link.reference
                              ? {
                                  ...item.link.reference,
                                  value:
                                    typeof item.link.reference.value ===
                                    "number"
                                      ? String(item.link.reference.value)
                                      : item.link.reference.value,
                                }
                              : null,
                          }}
                          appearance="link"
                          className="text-white hover:text-blue-200 h-full flex items-center px-2"
                        />
                      </li>
                    ))
                  : null}
              </ul>

              {/* Right Icons */}
              <div className="flex items-center h-full">
                {/* Account - Hidden on mobile */}
                <div className="hidden md:block">
                  <Suspense
                    fallback={
                      <div className="h-11 w-11 flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                    }
                  >
                    <AccountDrawer />
                  </Suspense>
                </div>

                {/* Cart - Always visible */}
                <div className="ml-4">
                  <Suspense
                    fallback={
                      <div className="h-11 w-11 flex items-center justify-center">
                        <ShoppingCart size={20} className="text-white" />
                      </div>
                    }
                  >
                    <Cart />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </Suspense>
  );
}
