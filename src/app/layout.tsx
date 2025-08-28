"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import AuthProvider from "./contexts/AuthProvider";
import { getToken } from "./(public)/(auth)/utils";
import { Toaster } from "react-hot-toast";
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
      <head>
        <title>Warehouse</title>
      </head>
      <body
        suppressHydrationWarning
        className={` ${poppins.className} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider token={token}>
            {children}
            <Toaster position="top-center" />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
