import clsx from "clsx";
import React from "react";

import { LogoIcon } from "./icons/logo";

export function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center"
      )}
    >
      {/* <LogoIcon
        className={clsx({
          'h-[10px] w-[10px]': size === 'sm',
          'h-[16px] w-[16px]': !size,
        })}
      /> */}
      <img
        src="/media/logo/companylogo1.png"
        alt="logo"
        className="relative w-[120px] h-[70px] lg:w-[190px] lg:h-[90px]"
      />
    </div>
  );
}
