import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Product, Post, Category } from "@/payload-types";

export interface HomePageData {
  featuredProducts: Product[];
  popularProducts: Product[];
  recentPosts: Post[];
}

/**
 * Fetch all home page data in a single function to minimize database queries
 */
export async function getHomePageData(): Promise<HomePageData> {
  const payload = await getPayload({ config: configPromise });

  // Fetch all data in parallel
  const [featuredProductsResult, popularProductsResult, recentPostsResult] = await Promise.all([
    payload.find({
      collection: "products",
      sort: "title",
      where: {
        _status: { equals: "published" },
      },
      limit: 5,
    }),
    payload.find({
      collection: "products",
      where: {
        _status: { equals: "published" },
      },
      limit: 8,
    }),
    payload.find({
      collection: "posts",
      limit: 6,
      where: {
        _status: {
          equals: "published",
        },
      },
      sort: "-publishedAt",
      depth: 2,
    }),
  ]);

  return {
    featuredProducts: featuredProductsResult.docs || [],
    popularProducts: popularProductsResult.docs || [],
    recentPosts: recentPostsResult.docs || [],
  };
}
