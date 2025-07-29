import React from "react";
import type { Page } from "@/payload-types";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/heros/RenderHero";

interface RegularPageContentProps {
  pageData: Page;
}

export function RegularPageContent({ pageData }: RegularPageContentProps) {
  return (
    <>
      {/* Hero Section */}
      {pageData.hero && <RenderHero {...pageData.hero} />}
      
      {/* Page Content Blocks */}
      {pageData.layout && pageData.layout.length > 0 && (
        <RenderBlocks blocks={pageData.layout} />
      )}
    </>
  );
}
