"use client";

import httpClient from "@/lib/axios";
import { GetCustomer } from "@/types/customer.types";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, use, useState } from "react";

type CustomersState = {
  customers: Array<GetCustomer>;
  remove: (id: number) => Promise<any>;
  isPending: boolean;
};

const CustomersContext = createContext<CustomersState>({
  customers: [],
  remove: async () => {},
  isPending: false,
});

export default function CustomerProvider({ children }: PropsWithChildren) {
  const [customers, setCustomers] = useState<Array<GetCustomer>>([]);

  // useEffect(() => {
  //   const loadCustomers = async () => {
  //     try {
  //       const res = await httpClient.get("/api/customers");
  //       setCustomers(res.data);
  //     } catch (error) {
  //       console.log("Failed to load customers:", error);
  //     }
  //   };

  //   loadCustomers();
  // }, []);

  const { data: customersData, isPending } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      try {
        const res = await httpClient.get("/api/customers");
        return res.data;
      } catch (error) {
        console.log("Failed to load customers:", error);
      }
    },
  });

  async function softDeleteCustomer(id: number) {
    const res = await httpClient.delete(`/api/customers/delete/${id}`);
    return res.data;
  }

  return (
    <CustomersContext
      value={{
        customers: customersData,
        remove: softDeleteCustomer,
        isPending,
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
