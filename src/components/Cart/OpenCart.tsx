import clsx from "clsx";
import { ShoppingCart } from "lucide-react";
import React from "react";

export function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center text-white hover:text-blue-200 focus:outline-none">
      <ShoppingCart
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110 ",
          className
        )}
      />

      {quantity ? (
        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-blue-600 text-[11px] font-medium text-white flex items-center justify-center">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
