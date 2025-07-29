import { PageData, HomePageData } from "./types";

/**
 * Check if the page is a home page
 */
export function isHomePage(slug: string | undefined): boolean {
  return !slug || slug === "home";
}

/**
 * Check if page data has hero blocks
 */
export function hasHeroBlocks(pageData: PageData): boolean {
  return Boolean(
    pageData?.page?.hero && 
    (pageData.page.hero.type === "highImpact" || pageData.page.hero.type === "mediumImpact")
  );
}

/**
 * Get page title or fallback
 */
export function getPageTitle(pageData: PageData, fallback: string = "Page"): string {
  return pageData?.page?.title || fallback;
}

/**
 * Check if home page data is valid
 */
export function isValidHomePageData(data: HomePageData | null): data is HomePageData {
  return Boolean(data && Array.isArray(data.products) && Array.isArray(data.posts));
}

/**
 * Get page metadata description
 */
export function getPageDescription(pageData: PageData): string | undefined {
  if (pageData?.page?.meta?.description) {
    return pageData.page.meta.description;
  }
  
  // Fallback to first text block content
  const firstContentBlock = pageData?.page?.layout?.find(
    (block) => block.blockType === "content" && "content" in block && block.content
  );
  
  if (firstContentBlock && "content" in firstContentBlock) {
    const textContent = extractTextFromRichText(firstContentBlock.content);
    return textContent.substring(0, 160);
  }
  
  return undefined;
}

/**
 * Extract plain text from rich text content
 */
function extractTextFromRichText(content: any): string {
  if (!content) return "";
  
  // This is a simplified extraction - you might need to adjust based on your rich text structure
  if (typeof content === "string") return content;
  
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") return item;
        if (item.text) return item.text;
        if (item.children) return extractTextFromRichText(item.children);
        return "";
      })
      .join(" ");
  }
  
  if (content.text) return content.text;
  if (content.children) return extractTextFromRichText(content.children);
  
  return "";
}
