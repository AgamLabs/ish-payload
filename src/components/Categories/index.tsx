import React from "react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { Category } from "@/payload-types";

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="flex flex-col gap-12">
      <div className="flex justify-between items-center">
        <h3 className="font-normal">Shop by Categories</h3>
        <Link href="/products">Show All</Link>
      </div>

      <div className="grid gap-7 p-0 md:grid-cols-3 sm:grid-cols-1">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
