import { RenderBlocks } from "@/blocks/RenderBlocks";
import { Gutter } from "@payloadcms/ui";
import React from "react";
import Filters from "./Filters";

const Products = () => {
  return (
    <div className="container mx-auto">
      <Gutter className="grid grid-cols-[1fr_75%] gap-14 lg:grid-cols-1 lg:gap-12">
        <Filters />
      </Gutter>
    </div>
  );
};

export default Products;
