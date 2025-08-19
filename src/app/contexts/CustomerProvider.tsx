"use client";

import httpClient from "@/lib/axios";
import { GetCustomer } from "@/types/customer.types";
import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";

type CustomersState = {
  customers: Array<GetCustomer>;
  remove: (id: number) => void;
};

const CustomersContext = createContext<CustomersState>({
  customers: [],
  remove: () => {},
});

export default function CustomerProvider({ children }: PropsWithChildren) {
  const [customers, setCustomers] = useState<Array<GetCustomer>>([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await httpClient.get("/api/customers");
        setCustomers(res.data);
      } catch (error) {
        console.log("Failed to load customers:", error);
      }
    };

    loadCustomers();
  }, []);

  function softDeleteCustomer(id: number) {
    const response = httpClient.delete(`/api/customers/delete/${id}`);
  }

  return (
    <CustomersContext
      value={{
        customers: customers,
        remove: softDeleteCustomer,
      }}
    >
      {children}
    </CustomersContext>
  );
}

export const useCustomers = () => {
  const context = use(CustomersContext);
  if (!context)
    throw new Error("useCustomers must be used within a CustomerProvider");
  return context;
};
