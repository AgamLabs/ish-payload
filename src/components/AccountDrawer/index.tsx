"use client";

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
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AccountDrawer() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative h-11 w-11 hidden md:flex items-center justify-center text-white hover:text-blue-200 focus:outline-none">
        <UserIcon className="h-5 w-5 transition-all ease-in-out hover:scale-110" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>My account</SheetTitle>

          <SheetDescription>
            You are currently shopping as a guest. Log in or create an account
            for an easier checkout process.
          </SheetDescription>
        </SheetHeader>
        <hr className="my-5" />
        {user ? (
          <div className="">
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
          <div className="flex flex-col flex-grow justify-between gap-2">
            <nav aria-label="My account navigation">
              <Link href="/order-lookup">Order Look-up</Link>
            </nav>

            <div className="flex-grow"></div>

            <div className="flex flex-col gap-2">
              <Button asChild className="w-full" variant="default">
                <Link
                  href={
                    pathname.includes("product")
                      ? `/login?redirect=${pathname}`
                      : "/login"
                  }
                >
                  Log in
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link
                  href={
                    pathname.includes("product")
                      ? `/create-account?redirect=${pathname}`
                      : "/create-account"
                  }
                >
                  Create an account
                </Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
