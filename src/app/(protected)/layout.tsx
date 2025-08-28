import React from "react";
import CustomerProvider from "../contexts/CustomerProvider";
import ProductProvider from "../contexts/ProductProvider";
import OrderProvider from "../contexts/OrderProvider";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <CustomerProvider>
      <ProductProvider>
        <OrderProvider>{children}</OrderProvider>
      </ProductProvider>
    </CustomerProvider>
  );
}
