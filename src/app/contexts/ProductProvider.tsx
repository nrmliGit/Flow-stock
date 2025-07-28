"use client";

import { ProductJoin } from "@/types/product.types";
import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";
import httpClient from "../../lib/axios";

type ProductState = {
  products: Array<ProductJoin>;
  addProduct: (item: ProductJoin) => void;
  removeProduct: (id: number) => void;
};

const ProductContext = createContext<ProductState>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
});

export default function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Array<ProductJoin>>([]);

  useEffect(() => {
    const getJoinProduct = async () => {
      try {
        return await httpClient.get("/api/product/join");
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    getJoinProduct().then((res) => setProducts(res?.data ?? []));
  }, []);

  return (
    <ProductContext
      value={{
        products,
        addProduct: () => {},
        removeProduct: () => {},
      }}
    >
      {children}
    </ProductContext>
  );
}

export const useProduct = () => {
  const context = use(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within a ProductProvider");
  return context;
};
