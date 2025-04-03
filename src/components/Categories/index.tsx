import React from "react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { Category } from "@/payload-types";

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="flex flex-col gap-[50px]">
      <div className="flex justify-between items-center">
        <h3 className="font-normal">Shop by Categories</h3>
        <Link href="/products">Show All</Link>
      </div>

      <div className="grid gap-[30px] p-0 grid-cols-2">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
