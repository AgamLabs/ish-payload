import { AuthProvider } from "@/providers/Auth";
import { CartProvider } from "@/providers/Cart";
import React from "react";

import { ThemeProvider } from "./Theme";
import { FilterProvider } from "./Filter";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            {children}
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
