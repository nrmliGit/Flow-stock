"use client";

import { GetOrder } from "@/types/order.types";
import { GetProductItem } from "@/types/product.types";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function OrderDetailModal({
  isOpen,
  item,
  onClose,
}: {
  isOpen: boolean;
  item: GetOrder;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  if (!isOpen) return null;

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
        {item.getProductItems.map((product: GetProductItem) => (
          <div key={product.id} className="w-[32%]">
            <div className="bg-white border border-blue-300 py-6 px-5 rounded-md">
              <div className="flex gap-5 place-items-center mb-4">
                <span className="whitespace-nowrap">Id:</span>
                <div className="border-2 border-gray-200 rounded-md w-full">
                  <div className="p-2 w-full">{product.id}</div>
                </div>
              </div>
              <div className="flex gap-5 place-items-center mb-4">
                <span className="whitespace-nowrap">Color Name:</span>
                <div className="border-2 border-gray-200 rounded-md w-full">
                  <div className="p-2 w-full">{product.colorName}</div>
                </div>
              </div>
              <div className="flex gap-5 place-items-center mb-4">
                <span className="whitespace-nowrap">Size:</span>
                <div className="border-2 border-gray-200 rounded-md w-full">
                  <div className="p-2 w-full">{product.size}</div>
                </div>
              </div>
              <div className="flex gap-5 place-items-center mb-4">
                <span className="whitespace-nowrap">Thumbnail:</span>
                <div className="border-2 border-gray-200 rounded-md w-full">
                  {product.thumbnail ? (
                    <div className="p-2 w-full">
                      <img
                        src={"http://localhost:5000" + "/" + product.thumbnail}
                        alt=""
                        className="w-[50px]"
                      />
                    </div>
                  ) : (
                    <div className="p-2 w-full">no image</div>
                  )}
                </div>
              </div>
              <div className="flex gap-5 place-items-center mb-4">
                <span className="whitespace-nowrap">Unit:</span>
                <div className="border-2 border-gray-200 rounded-md w-full">
                  <div className="p-2 w-full">{product.unit}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
