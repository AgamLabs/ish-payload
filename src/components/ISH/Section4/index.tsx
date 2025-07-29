"use client";

import landing from "../../../../data/data";
import { ArrowForwardIosTwoTone } from "@mui/icons-material";
import Link from "next/link";
import { Product } from "@/payload-types";
import { ProductCard } from "@/components/product/ProductCard";

interface Section4Props {
  products: Product[];
}

const Section4: React.FC<Section4Props> = ({ products }) => {

  return (
    <div className="py-10 px-3">
      <div className="flex justify-between md:px-10">
        <div className=" md:w-3/5 xl:w-2/5">
          <h1 className="text-trueGray text-4xl font-bold max-md:w-4/6">
            {landing.sec4.title}
          </h1>
          <p className=" text-trueGraysub mt-5">{landing.sec4.sub}</p>
        </div>
        <div className=" md:my-auto max-md:absolute max-md:right-2 max-md:mt-3">
          <Link
            href="/search"
            className=" px-4 py-3 bg-customBlue rounded-3xl text-grayfortext font-semibold"
          >
            View All <ArrowForwardIosTwoTone fontSize="small" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 max-md:gap-3 max-xl:gap-20 xl:grid-cols-4  py-20 ">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="mx-auto"
            imageClassName="w-[155px] h-[155px] sm:w-[270px] sm:h-[260px]"
            titleClassName="sm:text-[22px] text-grayforbottomtext"
            showPrice={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Section4;
