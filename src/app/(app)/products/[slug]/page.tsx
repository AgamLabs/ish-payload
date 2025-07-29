import type { Product } from "@/payload-types";
import type { Metadata } from "next";

import { RenderBlocks } from "@/blocks/RenderBlocks";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductGallery } from "@/components/product/ProductGallery";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { StructuredData } from "@/components/StructuredData";
import { notFound } from "next/navigation";
import React from "react";
import {
  calculateProductPrice,
  checkProductStock,
  buildProductGallery,
  generateProductStructuredData,
  getValidRelatedProducts,
  getProductMetaImage,
  queryProductBySlug,
} from "@/utilities/productUtils";
import { CSS_CLASSES } from "@/utilities/productConstants";
import { generateProductMetadata, getDefaultProductMetadata } from "@/utilities/metadataUtils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await queryProductBySlug({ slug });

  if (!product) {
    return getDefaultProductMetadata();
  }

  return generateProductMetadata(product);
}

type Args = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Args) {
  const { slug } = await params;
  const product = await queryProductBySlug({ slug });

  if (!product) return notFound();

  // Calculate product data using utility functions
  const price = calculateProductPrice(product);
  const hasStock = checkProductStock(product);
  const metaImage = getProductMetaImage(product);
  const gallery = buildProductGallery(product);
  const relatedProducts = getValidRelatedProducts(product);

  // Generate structured data for SEO
  const productJsonLd = generateProductStructuredData(
    product,
    price,
    hasStock,
    metaImage
  );

  return (
    <React.Fragment>
      <StructuredData data={productJsonLd} />
      
      <div className={CSS_CLASSES.container}>
        <div className={CSS_CLASSES.productLayout}>
          <ProductGallery gallery={gallery} />
          
          <div className={CSS_CLASSES.descriptionSection}>
            <ProductDescription product={product} />
          </div>
        </div>
      </div>

      {product.layout && <RenderBlocks blocks={product.layout} />}

      {relatedProducts.length > 0 && (
        <div className={CSS_CLASSES.container}>
          <RelatedProducts products={relatedProducts} />
        </div>
      )}
    </React.Fragment>
  );
}

