"use client";

import httpClient from "@/lib/axios";
import { GetOrder } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, use, useState } from "react";

type OrdersState = {
  orders: Array<GetOrder>;
  addOrder: (item: GetOrder) => void;
  remove: (id: number) => Promise<any>;
  isPending: boolean;
};

const OrdersContext = createContext<OrdersState>({
  orders: [],
  addOrder: () => {},
  remove: async () => {},
  isPending: false,
});

export default function OrderProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<Array<GetOrder>>([]);

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

  async function softDeleteOrder(id: number) {
    const res = await httpClient.delete(`/api/orders/softdelete/${id}`);
    return res.data;
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
