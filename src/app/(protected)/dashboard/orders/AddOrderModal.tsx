"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "@/lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { ProductItem } from "@/types/product.types";

export default function AddOrderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [isDisabled, setDisabled] = useState<boolean>(true);

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
        <div className="w-[32%]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
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
                name="name"
                placeholder="product name"
                className="p-2 w-full"
              />
            </div>
            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="text"
                name="customerId"
                placeholder="customer name"
                className="p-2 w-full"
              />
            </div>

            {/* <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="number"
                name="price"
                placeholder="price"
                className="p-2 w-full"
              />
            </div>
            <label className="text-gray-700  p-1">Choose a product unit:</label>
            <div className="border-2 border-gray-200 mb-4 mt-2 p-2 rounded-md ">
              {
                <select name="models" id="models">
                  <option value="0">Block</option>
                  <option value="1">Box</option>
                </select>
              }
            </div>

            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="number"
                name="quantity"
                placeholder="quantity"
                className="p-2 w-full"
              />
            </div> */}
            <button
              disabled={isDisabled}
              type="submit"
              className="bg-blue-500 text-white p-2 w-full  disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none  rounded-md"
            >
              Add Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
