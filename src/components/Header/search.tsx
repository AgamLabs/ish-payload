"use client";

import { createUrl } from "@/utilities/createUrl";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsValue = searchParams.get("q") ?? "";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const searchInput = form.elements.namedItem("q") as HTMLInputElement;
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", searchInput.value);
    const newParams = createUrl("/search", params);

    router.push(newParams);
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex items-center">
      <div className="relative w-full max-w-2xl mx-auto flex">
        <input
          id="q"
          type="text"
          name="q"
          placeholder="Search for products, brands and more..."
          autoComplete="off"
          defaultValue={searchParamsValue}
          className="w-full rounded-full border-2 border-[#003366] bg-white px-6 py-2.5 text-base text-gray-800 placeholder:text-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center p-2 text-[#003366] hover:text-blue-800 transition-colors"
          aria-label="Search"
        >
          <SearchIcon size={24} strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <div className="flex w-full items-center">
      <div className="relative flex w-full items-center overflow-hidden border-2 border-gray-300">
        <div className="flex-1 px-4 py-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-full w-12 animate-pulse bg-gray-200" />
      </div>
    </div>
  );
}
