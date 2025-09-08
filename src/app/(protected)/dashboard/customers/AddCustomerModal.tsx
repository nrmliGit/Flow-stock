"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCustomerApi } from "./utils";
import toast from "react-hot-toast";

export default function AddCustomerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [isDisabled, setDisabled] = useState(true);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addCustomerApi,
    onSuccess: () => {
      toast.success("Customer added successfully");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onClose(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data || "Something went wrong");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 cursor-default">
      <div className="absolute inset-0 bg-gray-300/50 backdrop-blur-sm"></div>
      <div className="relative z-10 flex justify-center items-center h-full">
        <button
          onClick={() => onClose(false)}
          className="bg-red-600 absolute right-[460px] top-[25px] w-[45px] h-[45px] place-items-center rounded-md"
        >
          <X />
        </button>
        <div className="w-[32%]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              mutate({
                name: formData.get("name") as string,
                phone: formData.get("phone") as string,
              });
            }}
            className="bg-white border border-blue-300 py-6 px-5 rounded-md"
          >
            <div className="border-2 border-gray-200 mb-4 rounded-md">
              <input
                onChange={(e) => setDisabled(e.target.value.length === 0)}
                type="text"
                name="name"
                placeholder="Customer name"
                className="p-2 w-full"
              />
            </div>
            <div className="border-2 border-gray-200 mb-4 rounded-md">
              <input
                onChange={(e) => setDisabled(e.target.value.length === 0)}
                type="number"
                name="phone"
                placeholder="Phone number"
                className="p-2 w-full"
              />
            </div>

            <button
              disabled={isDisabled || isPending}
              type="submit"
              className="bg-blue-500 text-white p-2 w-full disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none rounded-md"
            >
              {isPending ? "Adding..." : "Add Customer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
