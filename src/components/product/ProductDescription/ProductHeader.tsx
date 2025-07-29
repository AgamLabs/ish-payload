import React from "react";
import type { ProductMetadata } from "./types";

interface ProductHeaderProps {
  title: string;
  priceComponent: React.ReactNode;
}

export function ProductHeader({ title, priceComponent }: ProductHeaderProps) {
  return (
    <div className="mb-6 flex flex-col border-b pb-6">
      <h1 className="mb-2 text-5xl font-medium">{title}</h1>
      {priceComponent}
    </div>
  );
}
