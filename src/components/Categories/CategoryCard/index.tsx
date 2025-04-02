import { Category, Media } from "@/payload-types";
import Link from "next/link";
import React from "react";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.image as Media;

  return (
    <Link href="/products" style={{ backgroundImage: `url(${media?.url})` }}>
      <p>{category.title}</p>
    </Link>
  );
};

export default CategoryCard;
