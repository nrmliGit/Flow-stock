"use client";

import { useCustomers } from "@/app/contexts/CustomerProvider";
import { GetCustomer } from "@/types/customer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function CustomerRow({ item }: { item: GetCustomer }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { remove } = useCustomers();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => remove(id),
    onSuccess: () => {
      toast.success("Customer deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Failed to delete customer");
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <tr className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200">
      <td className="p-3">
        <span className="truncate block max-w-[150px] text-gray-800 font-medium">
          {item.name}
        </span>
      </td>
      <td className="p-3">
        <span className="truncate block max-w-[150px] text-gray-800">
          {item.phone}
        </span>
      </td>
      <td className="p-3 text-center">
        <div ref={dropdownRef} className="relative inline-block">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex justify-center items-center w-[30px] h-[30px] border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200 mx-auto"
          >
            <span className="text-gray-600 font-bold">...</span>
          </button>
          {isOpen && (
            <div className="absolute top-[-45px] right-[170px] transform translate-x-1/2 bg-white w-[250px] shadow-lg border border-gray-300 rounded-md px-3 py-2 text-sm z-10">
              <button
                onClick={() => mutate(item.id)}
                disabled={isPending}
                className="flex gap-2 items-center cursor-pointer py-2 px-2 w-full rounded-md hover:bg-red-100 transition-colors duration-200"
              >
                <Trash2Icon className="text-red-600 w-4 h-4" />
                <span className="text-red-700 font-medium">
                  {isPending ? "Deleting" : "  Delete Customer"}
                </span>
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
