import React from "react";
import Marquee from "react-fast-marquee";
import landing from "../../../../data/data";
import { Media, Product } from "@/payload-types";
import OptimizedImage from "../../OptimizedImage";

interface Section3Props {
  products: Product[];
}

const Section3: React.FC<Section3Props> = ({ products }) => {

  return (
    <div className="py-10 px-5">
      <h1 className="text-trueGray text-4xl font-bold text-center">
        {landing.sec3.title}
      </h1>
      <Marquee pauseOnHover>
        <div className="flex gap-32 ml-32 pt-14">
          {products.map((prd: Product) => {
            const img = prd.gallery as Media[];
            const imageSrc = img[0]?.url || "/media/image-hero1-1.webp";
            return (
              <div className="flex flex-col mx-auto">
                <div className="relative w-[270px] h-[260px] mb-3">
                  <OptimizedImage
                    className="rounded-xl"
                    src={imageSrc}
                    alt={prd.title}
                    fill
                    loading="lazy" // Lazy load since it's below the fold
                    sizes="(max-width: 768px) 100vw, 270px"
                    quality={75} // Reduce quality for better performance
                    fallbackSrc="/media/image-hero1-2.webp"
                  />
                </div>
                <div>
                  <h1 className=" text-center text-[22px]  text-grayforbottomtext">
                    {prd.title}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default Section3;
