"use client";

import { useOrders } from "@/app/contexts/OrderProvider";
import { GetOrder } from "@/types/order.types";
import { GetProductItem } from "@/types/product.types";
import { CheckIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import OrderDetailModal from "./OrderDetailModal";
import { completeOrder } from "./utils";

export default function OrderRow({ item }: { item: GetOrder }) {
  const [isOpenDetailsModal, setOpenDetailsModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { remove } = useOrders();

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

  //console.log(item);

  return (
    <tr className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200">
      <td className="p-3">
        <span className="truncate block max-w-[150px] text-gray-800 font-medium">
          {item.customerName}
        </span>
      </td>
      <td className="p-3 capitalize">
        {item.status === 0 ? (
          <div className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md inline-flex items-center">
            Pending
          </div>
        ) : (
          <div className="text-green-600 bg-green-50 px-2 py-1 rounded-md inline-flex items-center">
            Completed
          </div>
        )}
      </td>

      {item.getProductItems.map((product: GetProductItem) => (
        <Fragment key={product.id}>
          <td className="p-3  text-gray-800">
            <div className=" w-[30px] text-right">{product.price}₼</div>
          </td>
          <td className="p-3 text-gray-800">
            <span className=" px-2 py-1 ">
              {product.unit === 1 ? "Box" : "Block"}
            </span>
          </td>
          <td className="p-3 text-gray-800">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md inline-block min-w-[30px] text-center">
              {product.quantity}
            </span>
          </td>
        </Fragment>
      ))}

      <td className="p-3 text-center">
        <div ref={dropdownRef} className="relative inline-block">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex justify-center items-center w-[30px] h-[30px] border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200 mx-auto"
          >
            <span className="text-gray-600 font-bold">...</span>
          </button>
          {isOpen && (
            <div className="absolute top-[-55px] right-[170px] transform translate-x-1/2 bg-white w-[250px] shadow-lg border border-gray-300 rounded-md px-3 py-2 text-sm z-10">
              <button
                onClick={() => setOpenDetailsModal(true)}
                className="flex gap-2 items-center text-blue-600 cursor-pointer py-2 px-2 w-full rounded-md hover:bg-blue-100 transition-colors duration-200"
              >
                <EyeIcon className="w-4 h-4" />
                <span className="font-medium">View Order Details</span>
              </button>
              <button
                onClick={() => remove(item.id)}
                className="flex gap-2 items-center text-red-600 cursor-pointer py-2 px-2 w-full rounded-md hover:bg-red-100 transition-colors duration-200 mt-1"
              >
                <Trash2Icon className="w-4 h-4" />
                <span className="font-medium">Delete Order</span>
              </button>
              {item.status === 0 && (
                <button
                  onClick={() => completeOrder(item.id)}
                  className="flex gap-2 items-center text-green-600 cursor-pointer py-2 px-2 w-full rounded-md hover:bg-green-100 transition-colors duration-200 mt-1"
                >
                  <CheckIcon className="w-4 h-4" />
                  <span className="font-medium">Complete Order</span>
                </button>
              )}
            </div>
          )}
          {isOpenDetailsModal && (
            <OrderDetailModal
              isOpen={isOpenDetailsModal}
              item={item}
              onClose={() => setOpenDetailsModal(false)}
            />
          )}
        </div>
      </td>
    </tr>
  );
}
