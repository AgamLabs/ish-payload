import React from "react";
import Marquee from "react-fast-marquee";
import landing from "../../../../data/data";
import { Media, Product } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

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
          {products.map((prd: Product) => {
            const img = prd.gallery as Media[];
            const imageSrc = img[0]?.url || "/media/image-hero1-1.webp";
            return (
              <Link
                href={`/products/${prd.slug}`}
                key={prd.id}
                className="flex flex-col hover:scale-110 transition-transform duration-200"
              >
                <div className="relative w-[270px] h-[260px] mb-3 flex-shrink-0">
                  <Image
                    className="rounded-xl object-cover"
                    src={imageSrc}
                    alt={prd.title}
                    fill
                    loading="lazy" // Lazy load since it's below the fold
                    sizes="(max-width: 768px) 100vw, 270px"
                    quality={75} // Reduce quality for better performance
                  />
                </div>
                <div>
                  <h1 className=" text-center text-[22px]  text-grayforbottomtext">
                    {prd.title}
                  </h1>
                </div>
              </Link>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default Section3;
