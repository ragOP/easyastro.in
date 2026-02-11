"use client";

import React, { createContext, useContext } from "react";

export type CartTheme = "default" | "valentine";

const CartThemeContext = createContext<CartTheme>("default");

export function CartThemeProvider({
  theme,
  children,
}: {
  theme: CartTheme;
  children: React.ReactNode;
}) {
  return (
    <CartThemeContext.Provider value={theme}>
      {children}
    </CartThemeContext.Provider>
  );
}

export function useCartTheme() {
  return useContext(CartThemeContext);
}
