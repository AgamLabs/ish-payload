import type { Metadata } from "next";
import React from "react";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { generateMeta } from "@/utilities/generateMeta";

// Import optimized components and utilities
import type { PageProps } from "./types";
import { 
  usePageData, 
  generatePageMetadata, 
  generateStaticParams as generatePageStaticParams 
} from "./hooks";
import { HomePageContent } from "./components/HomePageContent";
import { RegularPageContent } from "./components/RegularPageContent";
import { isValidHomePageData } from "./utils";

// Import ISH specific components for home page
import Categories from "@/components/Categories";
import Section3 from "@/components/ISH/Section3";
import Section4 from "@/components/ISH/Section4";
import Section5 from "@/components/ISH/Section5";
import BlogSection from "@/components/ISH/BlogSection";
import Section7 from "@/components/ISH/Section7";
import Section8 from "@/components/ISH/Section8";

/**
 * Generate static params for all pages except home
 */
export async function generateStaticParams() {
  return generatePageStaticParams();
}

/**
 * Main page component with optimized data fetching and rendering
 */
export default async function Page({ params }: PageProps) {
  const { pageData, homeData, isHome } = await usePageData(params);
  const { slug = "home" } = await params;
  const url = "/" + slug;

  // Handle page not found
  if (!pageData && !isHome) {
    return <PayloadRedirects url={url} />;
  }

  return (
    <article>
      {isHome ? (
        <HomePageRenderer pageData={pageData} homeData={homeData} />
      ) : (
        <RegularPageContent pageData={pageData?.page!} />
      )}
    </article>
  );
}

/**
 * Home page renderer with ISH-specific sections
 */
async function HomePageRenderer({ 
  pageData, 
  homeData 
}: { 
  pageData: any; 
  homeData: any; 
}) {
  const { products = [], posts = [] } = homeData || {};
  
  // Get categories for the home page
  const { getCategories } = await import("./queries");
  const categories = await getCategories();

  return (
    <>
      <HomePageContent 
        pageData={pageData} 
        products={products} 
        posts={posts} 
      />
      <Categories categories={categories} />
      <Section3 products={products} />
      <Section4 products={products} />
      <Section5 />
      <BlogSection posts={posts} />
      <Section7 />
      <Section8 />
    </>
  );
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return generatePageMetadata(params);
}


