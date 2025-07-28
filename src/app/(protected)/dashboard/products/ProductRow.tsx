"use client";

import { ProductJoin } from "@/types/product.types";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { softDeleteProduct } from "./utils";
import ProductDetailModal from "./ProductDetailModal";

export default function ProductRow({ item }: { item: ProductJoin }) {
  const [isOpenRow, setIsOpenRow] = useState(false);
  const [isOpenDetailsModal, setOpenDetailsModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpenRow &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenRow(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenRow]);

  return (
    <tr
      key={item.id}
      className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <td className="p-3">{item.size}</td>
      <td className="p-3 ">
        {item.thumbnail ? (
          <img
            src={"http://localhost:5000" + "/" + item.thumbnail}
            alt=""
            className="w-[50px]"
          />
        ) : (
          <div>no image</div>
        )}
      </td>
      <td className="p-3">${item.price}</td>
      <td className="p-3">{item.blockNumber}</td>
      <td className="p-3 ">{item.pieceNumber}</td>
      <td className="p-3">{item.product_color_name}</td>
      <td className="p-3 cursor-pointer flex items-center justify-center">
        <div ref={dropdownRef} className="relative inline-block">
          <button
            onClick={() => setIsOpenRow((prev) => !prev)}
            className="flex  justify-center w-[30px] h-[30px] border-1 border-gray-300 rounded-md cursor-pointer"
          >
            ...
          </button>

          {isOpenRow && (
            <div className="absolute top-[30px] right-0 bg-white w-[250px]  shadow-lg border border-gray-200 rounded-md px-4 py-2 text-sm z-10">
              <button
                onClick={() => setOpenDetailsModal(true)}
                className="flex gap-2 items-center cursor-pointer py-[7px] px-[5px] w-[100%] rounded-md transition-color duration-200 hover:bg-gray-100"
              >
                <EyeIcon className="w-[18px]" />
                <span>Edit Product Details</span>
              </button>

              <button
                onClick={() => {
                  softDeleteProduct(item.id);
                }}
                className="flex gap-2 items-center cursor-pointer py-[7px] px-[5px] w-[100%] rounded-md transition-color duration-200 hover:bg-red-100"
              >
                <Trash2Icon className="text-red-500 w-[18px] " />
                <span className="text-red-500">Delete Product</span>
              </button>
            </div>
          )}
          {
            <ProductDetailModal
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
