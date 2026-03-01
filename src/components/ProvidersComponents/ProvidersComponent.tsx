"use client";
import AuthProvider from "@/providers/auth-provider";
import CartContextProvider from "@/providers/cart-provider";
import React from "react";
import { Provider } from "react-redux";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import { store } from "@/redux/store";
import ThemeProvider from "@/providers/theme-provider";

export default function ProvidersComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <CartContextProvider>
            <Navbar />
            <div className="pt-19">{children}</div>
            <Footer />
          </CartContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
