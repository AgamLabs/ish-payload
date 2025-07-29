import clsx from "clsx";
import type { OptionButtonProps } from "./types";

export function OptionButton({ 
  option, 
  isActive, 
  isAvailable, 
  onClick 
}: OptionButtonProps) {
  return (
    <button
      aria-disabled={!isAvailable}
      className={clsx(
        "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm",
        {
          "cursor-default ring-2 ring-blue-600": isActive,
          "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform":
            !isAvailable,
          "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600":
            !isActive && isAvailable,
        }
      )}
      disabled={!isAvailable}
      onClick={onClick}
      title={`${option.label}${!isAvailable ? " (Out of Stock)" : ""}`}
      type="button"
    >
      {option.label}
    </button>
  );
}
