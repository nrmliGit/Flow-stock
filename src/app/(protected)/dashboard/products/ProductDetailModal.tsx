"use client";

import { Product } from "@/types/product.types";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { updateProduct } from "./utils";

export default function ProductDetailModal({
  isOpen,
  item,
  onClose,
}: {
  isOpen: boolean;
  item: Product;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  if (!isOpen) return null;

  const [isDisabled, setDisabled] = useState<boolean>(true);

  return (
    <div className="fixed inset-0 z-50 cursor-default">
      <div className="absolute inset-0 bg-gray-300/50 backdrop-blur-sm"></div>
      <div className="relative z-10 flex justify-center items-center h-full">
        <button
          onClick={() => onClose(false)}
          className="bg-red-600 absolute  right-[460px] top-[25px] w-[45px] h-[45px]  place-items-center rounded-md"
        >
          <X />
        </button>
        <div className="w-[32%]">
          <form
            onSubmit={(e) => {
              if (updateProduct(e, item.id) === "ok") onClose(false);
            }}
            className="bg-white border border-blue-300 py-6 px-5 rounded-md"
          >
            <div className="flex gap-5 place-items-center mb-4">
              <span className="whitespace-nowrap">Size:</span>
              <div className="border-2 border-gray-200 rounded-md w-full">
                <input
                  onChange={(e) => {
                    if (e.target.value.length) setDisabled(false);
                    else setDisabled(true);
                  }}
                  type="text"
                  name="size"
                  placeholder={item.size}
                  className="p-2 w-full"
                />
              </div>
            </div>
            <div className="flex gap-5 place-items-center mb-4">
              <span className="whitespace-nowrap">Thumbnail:</span>
              <div className="border-2 border-gray-200 rounded-md w-full">
                <input
                  onChange={(e) => {
                    if (e.target.value.length) setDisabled(false);
                    else setDisabled(true);
                  }}
                  type="text"
                  name="thumbnail"
                  placeholder={item.thumbnail}
                  className="p-2 w-full"
                />
              </div>
            </div>
            <div className="flex gap-5 place-items-center mb-4">
              <span className="whitespace-nowrap">Price:</span>
              <div className="border-2 border-gray-200 rounded-md w-full">
                <input
                  onChange={(e) => {
                    if (e.target.value.length) setDisabled(false);
                    else setDisabled(true);
                  }}
                  type="number"
                  name="price"
                  placeholder={String(item.price)}
                  className="p-2 w-full"
                />
              </div>
            </div>
            <div className="flex gap-5 place-items-center mb-4">
              <span className="whitespace-nowrap">Piece Number:</span>
              <div className="border-2 border-gray-200 rounded-md w-full">
                <input
                  onChange={(e) => {
                    if (e.target.value.length) setDisabled(false);
                    else setDisabled(true);
                  }}
                  type="number"
                  name="pieceNumber"
                  placeholder={String(item.pieceNumber)}
                  className="p-2 w-full"
                />
              </div>
            </div>
            <div className="flex gap-5 place-items-center mb-4">
              <span className="whitespace-nowrap">Stock:</span>
              <div className="border-2 border-gray-200 rounded-md w-full">
                <input
                  onChange={(e) => {
                    if (e.target.value.length) setDisabled(false);
                    else setDisabled(true);
                  }}
                  type="number"
                  name="stock"
                  placeholder={String(item.stock)}
                  className="p-2 w-full"
                />
              </div>
            </div>
            <div className="flex gap-5 place-items-center mb-4">
              <span className="whitespace-nowrap">Block Number:</span>
              <div className="border-2 border-gray-200 rounded-md w-full">
                <input
                  onChange={(e) => {
                    if (e.target.value.length) setDisabled(false);
                    else setDisabled(true);
                  }}
                  type="number"
                  name="blockNumber"
                  placeholder={String(item.blockNumber)}
                  className="p-2 w-full"
                />
              </div>
            </div>

            <button
              disabled={isDisabled}
              type="submit"
              className="bg-blue-500 text-white p-2 w-full  disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none  rounded-md"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

