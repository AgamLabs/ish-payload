import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import type { QueryOptions, CategoriesQuery, ProductsQuery, PostsQuery, HomePageData } from "./types";

/**
 * Query a page by its slug
 */
export async function queryPageBySlug({ slug }: QueryOptions) {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
}

/**
 * Get all parent categories
 */
export async function getCategories() {
  const payload = await getPayload({ config: configPromise });
  
  const categories = await payload.find({
    collection: "categories",
    where: {
      parent: { equals: null },
    },
  });

  return categories.docs || null;
}

/**
 * Get published products with limit
 */
export async function getProducts(limit: number = 10) {
  const payload = await getPayload({ config: configPromise });
  
  const products = await payload.find({
    collection: "products",
    limit,
    where: {
      _status: { equals: "published" },
    },
  });

  return products.docs;
}

/**
 * Get published posts with limit
 */
export async function getPosts(limit: number = 5) {
  const payload = await getPayload({ config: configPromise });
  
  const posts = await payload.find({ 
    collection: "posts", 
    limit,
    where: {
      _status: { equals: "published" },
    },
  });

  return posts.docs;
}

/**
 * Get home page data (products and posts)
 */
export async function getHomePageData(): Promise<HomePageData> {
  const [products, posts] = await Promise.all([
    getProducts(10),
    getPosts(5),
  ]);

  return {
    products,
    posts,
  };
}

/**
 * Generate static params for all pages except home
 */
export async function generatePageStaticParams() {
  const payload = await getPayload({ config: configPromise });
  
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  return pages.docs
    ?.filter((doc) => doc.slug !== "home")
    .map(({ slug }) => ({ slug })) || [];
}
