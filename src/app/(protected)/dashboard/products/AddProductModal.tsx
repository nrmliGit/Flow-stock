"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, Suspense, useState } from "react";
import { addProduct } from "./utils";
import ProductColors from "./ProductColor";
import ProductModels from "./ProductModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AddProductModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
      onClose(false);
    },
  });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 cursor-default">
      <div className="absolute inset-0 bg-gray-300/50 backdrop-blur-sm"></div>

      <div className="relative z-10 flex justify-center items-center h-full">
        <button
          onClick={() => onClose(false)}
          className="bg-red-600 absolute  right-[350px] top-[25px] w-[45px] h-[45px]  place-items-center rounded-md"
        >
          <X />
        </button>
        <div className="w-[32%]">
          <form
            onSubmit={(e) => {
              // if (addProduct(e) === "ok") onClose(false);
              e.preventDefault();
              mutate(e);
            }}
            className="bg-white border border-blue-300 py-6 px-5 rounded-md"
          >
            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="text"
                name="size"
                placeholder="Size:"
                className="p-2 w-full"
              />
            </div>
            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="file"
                name="thumbnail"
                placeholder="thumbnail"
                className="p-2 w-full"
              />
            </div>
            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="number"
                name="price"
                placeholder="Price:"
                className="p-2 w-full"
              />
            </div>

            <label className="text-gray-700  p-1">
              Choose a product model:
            </label>

            <Suspense fallback={<>loading...</>}>
              <ProductModels />
            </Suspense>

            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="number"
                name="pieceNumber"
                placeholder="Piece number:"
                className="p-2 w-full"
              />
            </div>
            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="number"
                name="blockNumber"
                placeholder="Block number:"
                className="p-2 w-full"
              />
            </div>

            <label className="text-gray-700  p-1">Choose a color:</label>

            <Suspense fallback={<>loading...</>}>
              <ProductColors />
            </Suspense>

            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="number"
                name="stock"
                placeholder="Stock:"
                className="p-2 w-full"
              />
            </div>
            <button
              disabled={isDisabled || isPending}
              type="submit"
              className="bg-blue-500 text-white p-2 w-full  disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none  rounded-md"
            >
              {isPending ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
