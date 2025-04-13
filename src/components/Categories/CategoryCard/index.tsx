"use client";

import { Category, Media } from "@/payload-types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useFilter } from "@/providers/Filter";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.image as Media;
  const url = media?.url || "/media/image-hero1-1.webp";
  // console.log("Media: " + url);
  const { setCategoryFilters } = useFilter();

  return (
    // <Link
    //   className="relative bg-[var(--color-dark-50)] min-h-[360px] w-full flex items-end justify-center p-5 cursor-pointer bg-cover bg-center bg-no-repeat"
    //   href="/products"
    //   style={{ backgroundImage: `url(${media?.url})` }}
    //   onClick={() => setCategoryFilters([category.id.toString()])}
    // >
    //   <p className="w-full text-center bg-white rounded-lg p-4 dark:bg-black">
    //     {category.title}
    //   </p>
    // </Link>
    <div className=" flex-grow">
      <Link href={`/search/${category.slug}`}>
        <div className="relative xl:w-[620px] lg:w-[470px] sm:w-[500px] w-full h-[300px] sm:h-[350px] mx-auto">
          <Image className="rounded-lg" src={url} alt={category.title} fill />
          {/* <p className="absolute bottom-3  font-bold left-3  z-10  text-[18px]">{landing.sec2.pro1}</p> */}
        </div>
      </Link>
      <p className=" font-bold  text-trueGray my-5 text-[18px]">
        {category.title}
      </p>
    </div>
  );
};

export default CategoryCard;
