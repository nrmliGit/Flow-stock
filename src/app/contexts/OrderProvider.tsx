"use client";

import httpClient from "@/lib/axios";
import { GetOrder } from "@/types/order.types";
import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";

type OrdersState = {
  orders: Array<GetOrder>;
  addOrder: (item: GetOrder) => void;
  remove: (id: number) => void;
};

const OrdersContext = createContext<OrdersState>({
  orders: [],
  addOrder: () => {},
  remove: () => {},
});

export default function OrderProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<Array<GetOrder>>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await httpClient.get("/api/orders?filter=is_deleted");
        setOrders(res.data);
      } catch (error) {
        console.log("Failed to load orders:", error);
      }
    };

    loadOrders();
  }, []);

  const addOrder = (item: GetOrder) => {
    setOrders((prev) => [...prev, item]);
  };

  function softDeleteOrder(id: number) {
    const response = httpClient.delete(`/api/orders/softdelete/${id}`);
  }

  return (
    <OrdersContext
      value={{
        orders: orders,
        addOrder: addOrder,
        remove: softDeleteOrder,
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
