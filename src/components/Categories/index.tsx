import React from "react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { Category } from "@/payload-types";

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section>
      <div>
        <h3>Shop by Categories</h3>
        <Link href="/products">Show All</Link>
      </div>

      <div>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
