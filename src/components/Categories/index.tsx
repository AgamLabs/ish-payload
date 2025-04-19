import React from "react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { Category } from "@/payload-types";

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section>
      <div className="w-full  text-center mx-auto px-5 py-16">
        <h1 className=" font-oxygen font-bold text-[36px] text-trueGray mb-4">
          View Our Range Of Categories
        </h1>

        <p className=" font-exo text-trueGraysub mb-10">
          Explore our selection of steel products, featuring both flat and long
          options. Invest in your project's potential today!
        </p>

        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
