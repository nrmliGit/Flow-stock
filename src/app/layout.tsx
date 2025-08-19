"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import OrderProvider from "./contexts/OrderProvider";
import { useEffect, useState } from "react";
import AuthProvider from "./contexts/AuthProvider";
import { getToken } from "./(public)/(auth)/utils";
import { Toaster } from "react-hot-toast";
import ProductProvider from "./contexts/ProductProvider";
import CustomerProvider from "./contexts/CustomerProvider";
import ReactQueryProvider from "./contexts/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token, setToken] = useState<string | null | undefined>("");
  useEffect(() => {
    const receiveToken = async () => {
      const token = await getToken();
      setToken(token);
    };

    receiveToken();
  }, []);
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={` ${poppins.className} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider token={token}>
            <CustomerProvider>
              <ProductProvider>
                <OrderProvider>
                  {children}
                  <Toaster position="top-center" />
                </OrderProvider>
              </ProductProvider>
            </CustomerProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
