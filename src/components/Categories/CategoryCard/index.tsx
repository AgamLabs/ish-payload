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
      className="relative bg-[var(--color-dark-50)] min-h-[360px] w-full flex items-end justify-center p-5 cursor-pointer bg-cover bg-center bg-no-repeat"
      href="/products"
      style={{ backgroundImage: `url(${media?.url})` }}
      onClick={() => setCategoryFilters([category.id.toString()])}
    >
      <p className="w-full text-center bg-white rounded-lg p-4 dark:bg-black">
        {category.title}
      </p>
    </Link>
  );
};

export default CategoryCard;
