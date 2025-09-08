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
import { useQuery } from "@tanstack/react-query";

type ProductState = {
  products: Array<ProductJoin>;
  addProduct: (item: ProductJoin) => void;
  removeProduct: (id: number) => void;
  isPending: boolean;
};

const ProductContext = createContext<ProductState>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  isPending: false,
});

export default function ProductProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<Array<ProductJoin>>([]);

  // useEffect(() => {
  //   const getJoinProduct = async () => {
  //     try {
  //       return await httpClient.get("/api/product/join");
  //     } catch (error) {
  //       console.error("Product fetch error:", error);
  //     }
  //   };

  //   getJoinProduct().then((res) => setProducts(res?.data ?? []));
  // }, []);

  const { data: productsData, isPending } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const res = await httpClient.get("/api/product");
        return res.data;
      } catch (error) {
        console.log("Failed to load products:", error);
      }
    },
  });

  return (
    <ProductContext
      value={{
        products: productsData,
        addProduct: () => {},
        removeProduct: () => {},
        isPending,
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
