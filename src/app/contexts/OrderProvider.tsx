"use client";

import httpClient from "@/lib/axios";
import { GetOrder } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, use, useState } from "react";

type OrdersState = {
  orders: Array<GetOrder>;
  addOrder: (item: GetOrder) => void;
  remove: (id: number) => void;
  isPending: boolean;
};

const OrdersContext = createContext<OrdersState>({
  orders: [],
  addOrder: () => {},
  remove: () => {},
  isPending: false,
});

export default function OrderProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<Array<GetOrder>>([]);

  // useEffect(() => {
  //   const loadOrders = async () => {
  //     try {
  //       const res = await httpClient.get("/api/orders");
  //       setOrders(res.data);
  //     } catch (error) {
  //       console.log("Failed to load orders:", error);
  //     }
  //   };

  //   loadOrders();
  // }, []);

  const { data: ordersData, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await httpClient.get("/api/orders");
        return res.data;
      } catch (error) {
        console.log("Failed to load orders:", error);
      }
    },
  });

  const addOrder = (item: GetOrder) => {
    setOrders((prev) => [...prev, item]);
  };

  function softDeleteOrder(id: number) {
    const response = httpClient.delete(`/api/orders/softdelete/${id}`);
  }

  return (
    <OrdersContext
      value={{
        orders: ordersData,
        addOrder: addOrder,
        remove: softDeleteOrder,
        isPending,
      }}
    >
      {children}
    </OrdersContext>
  );
}

export const useOrders = () => {
  const context = use(OrdersContext);
  if (!context)
    throw new Error("useOrders must be used within a OrderProvider");
  return context;
};
