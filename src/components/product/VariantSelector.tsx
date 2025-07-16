"use client";

import type { Product } from "@/payload-types";

import { createUrl } from "@/utilities/createUrl";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export function VariantSelector({ product }: { product: Product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const variants = product.variants?.variants;
  const variantOptions = product.variants?.options;
  const hasVariants = Boolean(
    product.enableVariants && variants?.length && variantOptions?.length
  );

  if (!hasVariants) {
    return null;
  }

  /**
   * Flattened array of all possible variant combinations.
   */
  const combinations = variants!.map((variant) => {
    return variant.options;
  });

  // Track selected values for each option
  let selectedValues: Record<string, string | undefined> = {};
  variantOptions?.forEach((opt) => {
    const key = opt.slug.toLowerCase();
    selectedValues[key] = searchParams.get(key) || undefined;
  });

  return variantOptions?.map((key, idx) => {
    // Get all previous selections up to this option
    const prevSelections = variantOptions.slice(0, idx).map((prevKey) => {
      const prevSlug = prevKey.slug.toLowerCase();
      return { slug: prevSlug, value: selectedValues[prevSlug] };
    });

    // Filter variants that match all previous selections
    const matchingVariants =
      variants?.filter((variant) => {
        return prevSelections.every((sel) => {
          if (!sel.value) return true;
          const selValueSlug = sel.value
            ? sel.value.toString().toLowerCase().replace(/\s+/g, "-")
            : "";
          return variant.options.some(
            (opt) => opt.slug === selValueSlug || opt.label === sel.value
          );
        });
      }) || [];

    // For this selector, show only values that are present in the matching variants
    let options = (key.values || []).filter((option) => {
      return matchingVariants.some((variant) =>
        variant.options.some(
          (opt) => opt.slug === option.slug || opt.label === option.label
        )
      );
    });

    return (
      <dl className="mb-8" key={key.slug}>
        <dt className="mb-4 text-sm uppercase tracking-wide">{key.label}</dt>
        <dd className="flex flex-wrap gap-3">
          <React.Fragment>
            {options?.map((option) => {
              const optionSlug = option.slug;
              const optionKeyLowerCase = key.slug.toLowerCase();

              // Base option params on current params so we can preserve any other param state in the url.
              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              // Remove image and variant ID from this search params so we can loop over it safely.
              optionSearchParams.delete("variant");
              optionSearchParams.delete("image");

              // Update the option params using the current option to reflect how the url *would* change,
              // if the option was clicked.
              optionSearchParams.set(optionKeyLowerCase, option.slug);

              const optionUrl = createUrl(pathname, optionSearchParams);

              // Find the variant that matches all selected options including this one
              const allSelections = {
                ...selectedValues,
                [optionKeyLowerCase]: option.slug,
              };
              const matchingVariant = variants?.find((variant) => {
                return variant.options.every((opt) => {
                  const sel =
                    allSelections[opt.slug] || allSelections[opt.label];
                  return !sel || sel === opt.slug || sel === opt.label;
                });
              });

              const isAvailableForSale = Boolean(
                matchingVariant?.id && matchingVariant?.stock > 0
              );

              // The option is active if it's in the url params.
              const isActive =
                Boolean(isAvailableForSale) &&
                searchParams.get(optionKeyLowerCase) === option.slug;

              return (
                <button
                  aria-disabled={!isAvailableForSale}
                  className={clsx(
                    "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm",
                    {
                      "cursor-default ring-2 ring-blue-600": isActive,
                      "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform":
                        !isAvailableForSale,
                      "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ":
                        !isActive && isAvailableForSale,
                    }
                  )}
                  disabled={!isAvailableForSale}
                  key={option.slug}
                  onClick={() => {
                    router.replace(
                      `${optionUrl}&variant=${matchingVariant?.id || ""}`,
                      {
                        scroll: false,
                      }
                    );
                  }}
                  title={`${option.label} ${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                  type="button"
                >
                  {option.label}
                </button>
              );
            })}
          </React.Fragment>
        </dd>
      </dl>
    );
  });
}
