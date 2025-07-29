import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PageProps, HomePageData, PageData } from "./types";
import { 
  queryPageBySlug, 
  getHomePageData, 
  generatePageStaticParams 
} from "./queries";
import { 
  isHomePage, 
  getPageTitle, 
  getPageDescription,
  isValidHomePageData 
} from "./utils";

/**
 * Custom hook for page data fetching
 */
export async function usePageData(params: PageProps["params"]): Promise<{
  pageData: PageData | null;
  homeData: HomePageData | null;
  isHome: boolean;
}> {
  const { slug } = await params;
  const isHome = isHomePage(slug);

  let pageData: PageData | null = null;
  let homeData: HomePageData | null = null;

  if (isHome) {
    // For home page, get home-specific data
    homeData = await getHomePageData();
    
    // Also try to get the home page content if it exists
    const page = await queryPageBySlug({ slug: "home" });
    if (page) {
      pageData = {
        page,
        categories: null,
        homePageData: homeData,
      };
    }
  } else if (slug) {
    // For other pages, get page data
    const page = await queryPageBySlug({ slug });
    
    if (!page) {
      notFound();
    }

    pageData = {
      page,
      categories: null,
      homePageData: null,
    };
  }

  return {
    pageData,
    homeData,
    isHome,
  };
}

/**
 * Generate metadata for the page
 */
export async function generatePageMetadata(params: PageProps["params"]): Promise<Metadata> {
  const { slug } = await params;
  const isHome = isHomePage(slug);

  if (isHome) {
    return {
      title: "Home - ISH",
      description: "Welcome to ISH - Your premier destination for quality products",
    };
  }

  if (!slug) {
    return {
      title: "Page Not Found",
    };
  }

  const page = await queryPageBySlug({ slug });

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  // Convert Page to PageData for utility functions
  const pageData: PageData = {
    page,
    categories: null,
    homePageData: null,
  };

  const title = getPageTitle(pageData, "ISH");
  const description = getPageDescription(pageData);

  return {
    title: `${title} - ISH`,
    description,
    openGraph: page.meta?.image
      ? {
          title,
          description,
          images: [
            {
              url: typeof page.meta.image === "string" 
                ? page.meta.image 
                : typeof page.meta.image === "object" && page.meta.image && "url" in page.meta.image
                  ? (page.meta.image as any).url || ""
                  : "",
            },
          ],
        }
      : undefined,
  };
}

/**
 * Export static params generation
 */
export { generatePageStaticParams as generateStaticParams };
