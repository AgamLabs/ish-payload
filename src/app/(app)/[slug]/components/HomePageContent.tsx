import React from "react";
import type { Page, Product, Post } from "@/payload-types";
import { RenderHero } from "@/heros/RenderHero";
import type { PageData } from "../types";

interface HomePageContentProps {
  pageData: PageData | null;
  products: Product[];
  posts: Post[];
}

export function HomePageContent({ pageData, products, posts }: HomePageContentProps) {
  return (
    <>
      {/* Hero Section */}
      {pageData?.page?.hero && <RenderHero {...pageData.page.hero} />}
    </>
  );
}
