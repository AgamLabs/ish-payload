"use client";

import { Category, Media } from "@/payload-types";
import Link from "next/link";
import React from "react";
import { useFilter } from "@/providers/Filter";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.image as Media;
  console.log("Media: " + media.url);
  const { setCategoryFilters } = useFilter();

  return (
    <Link
      className="relative bg-[color:var(--color-dark-50)] min-h-[360px] w-full flex items-end justify-center cursor-pointer bg-cover bg-center bg-no-repeat p-5"
      href="/products"
      style={{ backgroundImage: `url(${media?.url})` }}
      onClick={() => setCategoryFilters([category.id.toString()])}
    >
      <p className="w-full text-center bg-[white] p-4 rounded-[10px] dark:bg-black">
        {category.title}
      </p>
    </Link>
  );
};

export default CategoryCard;
