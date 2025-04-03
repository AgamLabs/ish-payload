import { AuthProvider } from "@/providers/Auth";
import { CartProvider } from "@/providers/Cart";
import React from "react";

import { HeaderThemeProvider } from "./HeaderTheme";
import { ThemeProvider } from "./Theme";
import { FilterProvider } from "./Filter";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HeaderThemeProvider>
          <FilterProvider>
            <CartProvider>{children}</CartProvider>
          </FilterProvider>
        </HeaderThemeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
