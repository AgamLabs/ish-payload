"use client";

import { createContext } from "react";

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => {},
  sort: "",
  setSort: () => '',
};

const FilterContext = createContext(INITIAL_FILTER_DATA);

// export const FilterProvider = ({ children }: { children: React.ReactNode }) 