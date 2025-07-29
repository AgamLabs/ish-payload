"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import landing from "../../../../data/data";
import { Product } from "@/payload-types";
import { ProductCard } from "@/components/product/ProductCard";

interface Section3Props {
  products: Product[];
}

const Section3: React.FC<Section3Props> = ({ products }) => {

  return (
    <div className="py-10 px-5 overflow-hidden">
      <h1 className="text-trueGray text-4xl font-bold text-center mb-8">
        {landing.sec3.title}
      </h1>
      <Marquee pauseOnHover speed={50}>
        <div className="flex gap-32 ml-32 pt-8 pb-8 items-start">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="flex-shrink-0"
              imageClassName="w-[270px] h-[260px]"
              titleClassName="text-[22px] text-grayforbottomtext"
              showPrice={false}
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Section3;
