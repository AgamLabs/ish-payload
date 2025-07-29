import type { Product } from "@/payload-types";

export interface VariantOption {
  id: string;
  label: string;
  slug: string;
}

export interface VariantGroup {
  slug: string;
  label: string;
  values: VariantOption[];
}

export interface Variant {
  id: string;
  price: number;
  stock: number;
  options: VariantOption[];
}

export interface VariantSelections {
  [optionSlug: string]: string;
}

export interface VariantSelectorProps {
  product: Product;
}

export interface OptionButtonProps {
  option: VariantOption;
  optionGroup: VariantGroup;
  isActive: boolean;
  isAvailable: boolean;
  onClick: () => void;
}

export interface OptionGroupProps {
  optionGroup: VariantGroup;
  availableOptions: VariantOption[];
  selectedValue?: string;
  onOptionSelect: (optionSlug: string) => void;
}
