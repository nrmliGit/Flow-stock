"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import SearchProduct from "./SearchProduct";
import SearchCustomer from "./SearchCustomer";
import { ProductJoin } from "@/types/product.types";
import { GetCustomer } from "@/types/customer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "@/lib/axios";
import { OrderProductType } from "@/types/order.types";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddOrderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [selectedProducts, setSelectedProducts] = useState<
    Array<ProductJoin & Omit<OrderProductType, "id">>
  >([]);
  const [selectedCustomer, setSelectedCustomer] = useState<GetCustomer | null>(
    null
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (selectedProducts.length === 0 && !selectedCustomer) return;

      const response = await httpClient
        .post("http://localhost:5000/api/orders/add", {
          customerId: selectedCustomer?.id,
          productItems: selectedProducts.map((p) => ({
            id: p.id,
            quantity: 1,
            price: p.price,
            unit: 2,
          })),
        })
        .then((res) => {
          if (res.status === 201) {
            setSelectedProducts([]);
            setSelectedCustomer(null);
            onClose(false);
            toast.success("Order added Successfully");
          }
        })
        .catch((e) => {
          if (axios.isAxiosError(e)) toast.error(e.response?.data);
          else {
            toast.error("Something went wrong");
            console.error("Unknown Error:", e);
          }
        });
    },
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      }),
  });

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 cursor-default">
      <div className="absolute inset-0 bg-gray-300/50 backdrop-blur-sm"></div>
      <div className="relative z-10 flex justify-center items-center h-full">
        <button
          onClick={() => onClose(false)}
          className="bg-red-600 absolute  right-[30%] top-[14%] w-[45px] h-[45px]  place-items-center rounded-md"
        >
          <X />
        </button>
        <div className="w-[40%]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
            className="bg-white border border-blue-300 py-6 px-5 rounded-md"
          >
            <SearchProduct
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              setDisabled={setDisabled}
            />
            <SearchCustomer
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              setDisabled={setDisabled}
            />
            <button
              disabled={isDisabled}
              type="submit"
              className="bg-blue-500 text-white p-2 w-full  disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none  rounded-md"
            >
              {isPending ? "Processing..." : "Add Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
