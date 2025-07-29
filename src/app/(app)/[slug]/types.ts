import type { Page } from "@/payload-types";

export interface PageProps {
  params: Promise<{
    slug?: string;
  }>;
}

export interface HomePageData {
  products: any[];
  posts: any[];
}

export interface PageData {
  page: Page | null;
  categories: any[] | null;
  homePageData: HomePageData | null;
}

export interface QueryOptions {
  slug: string;
  draft?: boolean;
}

export interface CategoriesQuery {
  parent?: { equals: null };
}

export interface ProductsQuery {
  limit: number;
  where: {
    _status: { equals: "published" };
  };
}

export interface PostsQuery {
  limit: number;
  where: {
    _status: { equals: "published" };
  };
}
