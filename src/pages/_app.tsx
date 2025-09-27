import React, { Suspense, useEffect } from "react";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import "public/app/css/fontawesome-pro.css";
import "@/styles/index-four.scss";
import "@/styles/main.scss";

import AOS from "aos";
import "aos/dist/aos.css";

import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Suspense>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </Suspense>
  );
}
