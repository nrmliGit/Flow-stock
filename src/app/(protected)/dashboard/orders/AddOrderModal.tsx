"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { addOrder } from "./utils";

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
          className="bg-red-600 absolute  right-[460px] top-[25px] w-[45px] h-[45px]  place-items-center rounded-md"
        >
          <X />
        </button>
        <div className="w-[32%]">
          <form
            onSubmit={(e) => {
              if (addOrder(e) === "ok") onClose(false);
            }}
            className="bg-white border border-blue-300 py-6 px-5 rounded-md"
          >
            <div className="border-2 border-gray-200 mb-4  rounded-md">
              <input
                onChange={(e) => {
                  if (e.target.value.length) setDisabled(false);
                  else setDisabled(true);
                }}
                type="number"
                name="id"
                placeholder="id"
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
                name="customerId"
                placeholder="customerId"
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
                placeholder="price"
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
                name="unit"
                placeholder="unit"
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
                name="quantity"
                placeholder="quantity"
                className="p-2 w-full"
              />
            </div>
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
