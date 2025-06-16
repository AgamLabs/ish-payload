"use client";

import type { Header } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/providers/Auth";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

import { Search, SearchSkeleton } from "./search";

interface Props {
  menu: Header["navItems"];
}

export function MobileMenu({ menu }: Props) {
  const { user } = useAuth();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const _closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative flex h-11 w-11 items-center justify-center rounded-md border-none text-white transition-colors">
        <MenuIcon className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>My Store</SheetTitle>

          <SheetDescription />
        </SheetHeader>

        <div className="py-4">
          <div className="mb-4 w-full">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          {menu?.length ? (
            <ul className="flex w-full flex-col">
              {menu.map((item) => (
                <li className="py-2" key={item.id}>
                  <CMSLink
                    {...{
                      ...item.link,
                      reference: item.link.reference
                        ? {
                            ...item.link.reference,
                            value:
                              typeof item.link.reference.value === "number"
                                ? String(item.link.reference.value)
                                : item.link.reference.value,
                          }
                        : null,
                    }}
                    appearance="link"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {user ? (
          <div className="mt-4">
            <h2 className="text-xl mb-4">My account</h2>
            <hr className="my-2" />
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/orders">Orders</Link>
              </li>
              <li>
                <Link href="/account">Manage account</Link>
              </li>
              <li className="mt-6">
                <Button asChild variant="outline">
                  <Link href="/logout">Log out</Link>
                </Button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-4">My account</h2>
            <div className="flex items-center gap-2 mt-4">
              <Button asChild className="w-full" variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
              <span>or</span>
              <Button asChild className="w-full">
                <Link href="/create-account">Create an account</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
