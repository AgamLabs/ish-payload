import type { Metadata } from "next";

import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/heros/RenderHero";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { generateMeta } from "@/utilities/generateMeta";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React from "react";

import type { Page } from "@/payload-types";
import Categories from "@/components/Categories";
import Section3 from "@/components/ISH/Section3";
import Section4 from "@/components/ISH/Section4";
import Section5 from "@/components/ISH/Section5";
import BlogSection from "@/components/ISH/BlogSection";
import Section7 from "@/components/ISH/Section7";
import Section8 from "@/components/ISH/Section8";

export async function generateStaticParams() {
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

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Page({ params }: Args) {
  const { slug = "home" } = await params;
  const url = "/" + slug;

  const page = await queryPageBySlug({
    slug,
  });

  // Get payload instance
  const payload = await getPayload({ config: configPromise });

  // Fetch categories and home page data in parallel
  const [categories, homePageData] = await Promise.all([
    getCategories(),
    slug === "home"
      ? Promise.all([
          payload.find({
            collection: "products",
            limit: 10,
            where: {
              _status: { equals: "published" },
            },
          }),
          payload.find({ 
            collection: "posts", 
            limit: 5,
            where: {
              _status: { equals: "published" },
            },
          }),
        ]).then(([products, posts]) => ({
          products: products.docs,
          posts: posts.docs,
        }))
      : Promise.resolve(null),
  ]);

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  const { hero, layout } = page;

  return (
    <article>
      {slug === "home" ? (
        <>
          <RenderHero {...hero} />
          <Categories categories={categories} />
          <Section3 products={homePageData?.products || []} />
          <Section4 products={homePageData?.products || []} />
          <Section5 />
          <BlogSection posts={homePageData?.posts || []} />
          <Section7 />
          <Section8 />
        </>
      ) : (
        <>
          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} />
        </>
      )}
    </article>
  );
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = "home" } = await params;

  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
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
};

async function getCategories() {
  const payload = await getPayload({ config: configPromise });
  const categories = await payload.find({
    collection: "categories",
    where: {
      // This assumes your parent categories either have no parent field
      // or the parent field is explicitly set to null
      parent: { equals: null },
    },
  });

  return categories.docs || null;
}
