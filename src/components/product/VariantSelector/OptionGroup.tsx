import React from "react";
import type { OptionGroupProps, Variant, VariantSelections } from "./types";
import { OptionButton } from "./OptionButton";
import { findMatchingVariant, isVariantAvailable } from "./utils";

interface OptionGroupComponentProps extends OptionGroupProps {
  variants: Variant[];
  currentSelections: VariantSelections;
}

export function OptionGroup({ 
  optionGroup, 
  availableOptions, 
  selectedValue,
  onOptionSelect,
  variants,
  currentSelections
}: OptionGroupComponentProps) {
  return (
    <dl className="mb-8">
      <dt className="mb-4 text-sm uppercase tracking-wide">
        {optionGroup.label}
      </dt>
      <dd className="flex flex-wrap gap-3">
        {availableOptions.map((option) => {
          // Calculate what selections would be if this option was chosen
          const hypotheticalSelections = {
            ...currentSelections,
            [optionGroup.slug]: option.slug,
          };
          
          // Find matching variant for this option
          const matchingVariant = findMatchingVariant(
            variants,
            hypotheticalSelections,
            Object.keys(hypotheticalSelections).length === 1
          );
          
          const isAvailable = isVariantAvailable(matchingVariant);
          const isActive = selectedValue === option.slug && isAvailable;
          
          return (
            <OptionButton
              key={option.slug}
              option={option}
              optionGroup={optionGroup}
              isActive={isActive}
              isAvailable={isAvailable}
              onClick={() => onOptionSelect(option.slug)}
            />
          );
        })}
      </dd>
    </dl>
  );
}
