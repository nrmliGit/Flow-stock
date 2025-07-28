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
    <tr className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
      <td className="p-3">
        <span className="truncate block max-w-[150px]">
          {item.customerName}
        </span>
      </td>
      <td className="p-3 capitalize">
        {item.status === 0 ? (
          <div className="text-yellow-600">Pending</div>
        ) : (
          <div className="text-red-500">Completed</div>
        )}
      </td>

      {item.getProductItems.map((product: GetProductItem) => (
        <Fragment key={product.id}>
          <td className="p-6">{product.price}</td>
          <td className="p-6">{product.unit}</td>
          <td className="p-6">{product.quantity}</td>
        </Fragment>
      ))}

      <td className="p-3 cursor-pointer flex items-center justify-center">
        <div ref={dropdownRef} className="relative inline-block">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex justify-center w-[30px] h-[30px] border-1 border-gray-300 rounded-md cursor-pointer"
          >
            ...
          </button>
          {isOpen && (
            <div className="absolute top-[30px] right-0 bg-white w-[250px] shadow-lg border border-gray-200 rounded-md px-4 py-2 text-sm z-10">
              <button
                onClick={() => setOpenDetailsModal(true)}
                className="flex gap-2 items-center cursor-pointer py-[7px] px-[5px] w-[100%] rounded-md transition-color duration-200 hover:bg-gray-100"
              >
                <EyeIcon className="w-[18px]" />
                <span>View Order Details</span>
              </button>
              <button
                onClick={() => remove(item.id)}
                className="flex gap-2 items-center cursor-pointer py-[7px] px-[5px] w-[100%] rounded-md transition-color duration-200 hover:bg-red-100"
              >
                <Trash2Icon className="text-red-500 w-[18px]" />
                <span className="text-red-500">Delete Order</span>
              </button>

              <button
                onClick={() => completeOrder(item.id)}
                className="flex gap-2 items-center cursor-pointer py-[7px] px-[5px] w-[100%] rounded-md transition-color duration-200 hover:bg-green-100"
              >
                <CheckIcon className="text-green-700 w-[18px]" />
                <span className="text-green-700">Complete Order</span>
              </button>
            </div>
          )}
          {
            <OrderDetailModal
              isOpen={isOpenDetailsModal}
              item={item}
              onClose={setOpenDetailsModal}
            />
          }
        </div>
      </td>
    </tr>
  );
}
