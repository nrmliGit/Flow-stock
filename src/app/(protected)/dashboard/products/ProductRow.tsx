"use client";

import { ProductJoin } from "@/types/product.types";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { softDeleteProduct } from "./utils";
import ProductDetailModal from "./ProductDetailModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function ProductRow({ item }: { item: ProductJoin }) {
  const [isOpenRow, setIsOpenRow] = useState(false);
  const [isOpenDetailsModal, setOpenDetailsModal] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => softDeleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

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
      className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200"
    >
      <td className="p-3 text-gray-800">{item.size}</td>
      <td className="p-3 w-[50px] h-[50px]">
        {item.thumbnail ? (
          <img
            src={"http://localhost:5000" + "/" + item.thumbnail}
            alt=""
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="relative flex items-center justify-center bg-gray-200 rounded-md w-[50px] h-[50px] text-gray-500 text-sm">
            <span className="whitespace-nowrap">no image</span>
          </div>
        )}
      </td>
      <td className="p-3 text-green-600 font-medium">{item.price}₼</td>
      <td className="p-3">
        <div className="bg-green-100 text-green-700 font-medium rounded-md flex items-center justify-center w-[30px] h-[30px] mx-auto">
          {item.stock}
        </div>
      </td>
      <td className="p-3 text-gray-800">{item.blockNumber}</td>
      <td className="p-3 text-gray-800">{item.pieceNumber}</td>
      <td className="p-3 text-gray-800">{item.product_color_name}</td>
      <td className="p-3 text-center">
        <div ref={dropdownRef} className="relative inline-block">
          <button
            onClick={() => setIsOpenRow((prev) => !prev)}
            className="flex justify-center items-center w-[30px] h-[30px] border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-200 mx-auto"
          >
            <span className="text-gray-600 font-bold">...</span>
          </button>

          {isOpenRow && (
            <div className="absolute top-[-45px] right-[170px] transform translate-x-1/2 bg-white w-[250px] shadow-lg border border-gray-300 rounded-md px-3 py-2 text-sm z-10">
              <button
                onClick={() => setOpenDetailsModal(true)}
                className="flex gap-2 items-center text-blue-600 cursor-pointer py-2 px-2 w-full rounded-md hover:bg-blue-100 transition-colors duration-200"
              >
                <EyeIcon className="w-4 h-4" />
                <span className="font-medium">Edit Product Details</span>
              </button>

              <button
                onClick={() => deleteMutation.mutate(item.id)}
                disabled={deleteMutation.isPending}
                className="flex gap-2 items-center text-red-600 cursor-pointer py-2 px-2 w-full rounded-md hover:bg-red-100 transition-colors duration-200 mt-1"
              >
                <Trash2Icon className="w-4 h-4" />
                <span className="font-medium">
                  {deleteMutation.isPending ? "Deleting" : "  Delete Product"}
                </span>
              </button>
            </div>
          )}
          {isOpenDetailsModal && (
            <ProductDetailModal
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
