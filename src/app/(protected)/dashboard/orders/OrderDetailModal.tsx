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

      <div className="relative z-10 flex justify-items-center h-full  overflow-x-hidden p-6">
        <button
          onClick={() => onClose(false)}
          className="bg-red-600 fixed right-[2%] top-[3%] w-[45px] h-[45px] flex justify-center items-center rounded-md"
        >
          <X />
        </button>

        <div
          className="
          flex
          flex-col
        items-center
        w-full  mx-auto
      "
        >
          {item.getProductItems.map((product: GetProductItem) => (
            <div
              key={product.id}
              className="bg-white border border-blue-300 py-4 px-4 rounded-md mb-[20px] shadow-md w-full max-w-[320px]"
            >
              <div className="flex gap-4 items-center mb-3">
                <span className="whitespace-nowrap w-[110px] font-medium text-gray-700">
                  Model Name:
                </span>
                <div className="border border-gray-200 rounded-md flex-1">
                  <div className="px-2 py-1">{product.modelName}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-3">
                <span className="whitespace-nowrap w-[110px] font-medium text-gray-700">
                  Price:
                </span>
                <div className="border border-gray-200 rounded-md flex-1">
                  <div className="px-2 py-1">{product.price}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-3">
                <span className="whitespace-nowrap w-[110px] font-medium text-gray-700">
                  Unit:
                </span>
                <div className="border border-gray-200 rounded-md flex-1">
                  <div className="px-2 py-1">
                    {product.unit === 1 ? "Box" : "Block"}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-3">
                <span className="whitespace-nowrap w-[110px] font-medium text-gray-700">
                  Quantity:
                </span>
                <div className="border border-gray-200 rounded-md flex-1">
                  <div className="px-2 py-1">{product.quantity}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-3">
                <span className="whitespace-nowrap w-[110px] font-medium text-gray-700">
                  Color Name:
                </span>
                <div className="border border-gray-200 rounded-md flex-1">
                  <div className="px-2 py-1">{product.colorName}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-3">
                <span className="whitespace-nowrap w-[110px] font-medium text-gray-700">
                  Size:
                </span>
                <div className="border border-gray-200 rounded-md flex-1">
                  <div className="px-2 py-1">{product.size}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center mb-3">
                <span className="whitespace-nowrap w-[110px] font-medium text-gray-700">
                  Thumbnail:
                </span>
                <div className="border border-gray-200 rounded-md flex-1">
                  <div className="px-2 py-1 flex justify-center">
                    {product.thumbnail ? (
                      <div className="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center rounded-md overflow-hidden">
                        <img
                          src={`http://localhost:5000/${product.thumbnail}`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-[50px] h-[50px] bg-gray-200 flex justify-center items-center rounded-md text-gray-500 text-sm">
                        <span className="whitespace-nowrap">no image</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
