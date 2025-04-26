import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import landing from "../../../../data/data";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Media, Product } from "@/payload-types";

async function getFeaturedProducts(): Promise<Product[]> {
  const payload = await getPayload({ config: configPromise });
  const featuredProducts = await payload.find({
    collection: "products",
    sort: "title",
    where: {
      // Your filtering criteria
      _status: { equals: "published" },
    },
    limit: 5,
  });

  return featuredProducts.docs || null;
}

const Section3 = async () => {
  const products = await getFeaturedProducts();

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
                  <Image
                    className="rounded-xl"
                    src={imageSrc}
                    alt={prd.title}
                    fill
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
