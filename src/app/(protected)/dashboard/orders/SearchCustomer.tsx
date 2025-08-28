"use client";

import httpClient from "@/lib/axios";
import { GetCustomer } from "@/types/customer.types";
import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SearchCustomer({
  selectedCustomer,
  setSelectedCustomer,
  ...props
}: {
  selectedCustomer: GetCustomer | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<GetCustomer | null>>;
  setDisabled: (value: React.SetStateAction<boolean>) => void;
}) {
  const [isVisibleProductsContainer, setVisibleProductsContainer] =
    useState<boolean>(true);
  const [customers, setCustomers] = useState<Array<GetCustomer> | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = async (value: string) => {
    if (value === "") setCustomers(null);
    else {
      setCustomers([]);
      setVisibleProductsContainer(true);

      try {
        const response = await httpClient.post(`/api/customers/search`, {
          name: value,
        });
        setCustomers(response.data);
      } catch {
        setCustomers(null);
        setVisibleProductsContainer(false);
      }
    }
  };

  const handleSelectedCustomer = (customer: GetCustomer) =>
    setSelectedCustomer(customer);

  useEffect(() => {
    const listener = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setVisibleProductsContainer(false);
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);

  return (
    <div className="relative">
      <div className="border-2 border-gray-200 mb-4  rounded-md">
        {selectedCustomer ? (
          <div className="w-full h-10 p-2 flex items-center justify-between">
            <div>
              <span>{selectedCustomer.name}</span>
            </div>
            <button onClick={() => setSelectedCustomer(null)}>
              <XIcon className="!w-[18px] !h-[18px]" />
            </button>
          </div>
        ) : (
          <input
            onChange={(e) => {
              if (e.target.value.length) props.setDisabled(false);
              else props.setDisabled(true);
              handleChange(e.target.value);
            }}
            type="text"
            placeholder="Enter customer name"
            className="p-2 w-full"
          />
        )}
      </div>
      {!selectedCustomer && customers !== null && isVisibleProductsContainer ? (
        <div
          ref={containerRef}
          className="bg-white absolute top-[calc(100%_+_5px)] w-full border-2 border-gray-200 shadow-md rounded-md  max-h-62.5 z-1 overflow-auto"
        >
          {customers.length > 0 ? (
            <ul>
              {customers.map((c, index) => {
                return (
                  <li
                    key={index}
                    className="flex  items-center justify-between p-2 hover:bg-gray-100"
                  >
                    <div>{c.name}</div>
                    <div>
                      <button
                        className="[&>svg]:w-5 [&>svg]:h-5"
                        onClick={() => handleSelectedCustomer(c)}
                      >
                        add
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="h-25 grid place-items-center">loading...</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
