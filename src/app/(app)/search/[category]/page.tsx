import { Grid } from "@/components/grid";
import { ProductGridItems } from "@/components/layout/ProductGridItems";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";

export const metadata = {
  description: "Search for products in the store.",
  title: "Search",
};

export default async function SearchCategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { category } = await props.params;
  const { q: searchValue, sort } = await props.searchParams;

  const payload = await getPayload({ config: configPromise });

  // First find the category by slug
  const categoryBySlug = (
    await payload.find({
      collection: "categories",
      where: {
        slug: { equals: category },
      },
    })
  ).docs?.[0];

  // console.log(categoryBySlug)

  if (!categoryBySlug) {
    // Handle not found
    throw new Error(`Category not found for slug: ${category}`);
  }

  // Now find categories where either:
  // - slug matches, or
  // - parent equals the found category ID
  const categoryDoc = (
    await payload.find({
      collection: "categories",
      where: {
        or: [
          { slug: { equals: category } },
          { parent: { equals: categoryBySlug.id } }, // use ID, not slug
        ],
      },
    })
  ).docs?.[0];

  // console.log(categoryDoc)

  const safeSearchValue = searchValue ?? "";

  const products = await payload.find({
    collection: "products",
    ...(sort ? { sort } : { sort: "title" }),
    where: {
      and: [
        ...(categoryDoc ? [{ categories: { contains: categoryDoc.id } }] : []),
        {
          or: [
            {
              title: {
                like: safeSearchValue,
              },
            },
            // {
            //   description: {
            //     like: safeSearchValue,
            //   },
            // },
          ],
        },
      ],
    },
  });
  const resultsText = products.docs.length > 1 ? "results" : "result";

  return (
    <React.Fragment>
      {safeSearchValue ? (
        <p className="mb-4">
          {products?.docs.length === 0
            ? "There are no products that match "
            : `Showing ${products.docs.length} ${resultsText} for `}
          <span className="font-bold">&quot;{safeSearchValue}&quot;</span>
        </p>
      ) : null}
      {products?.docs.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products.docs} />
        </Grid>
      ) : null}
    </React.Fragment>
  );
}
