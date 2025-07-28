"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { addProduct } from "./utils";

export default function AddProductModal({
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
              if (addProduct(e) === "ok") onClose(false);
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
            <div className="border-2 border-gray-200 mb-4 mt-2 p-2 rounded-md ">
              <select name="models" id="models">
                <option value="1">1296</option>
                <option value="2">5575</option>
                <option value="3">5175</option>
                <option value="4">708</option>
              </select>
            </div>

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
            <div className="border-2 border-gray-200 mb-4 mt-2 p-2 rounded-md ">
              <select name="colors" id="colors">
                <option value="1">BK</option>
                <option value="2">Golden</option>
                <option value="3">White</option>
              </select>
            </div>

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
              disabled={isDisabled}
              type="submit"
              className="bg-blue-500 text-white p-2 w-full  disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none  rounded-md"
            >
              Add Product
            </button>
          </form>
          {/* <label>Choose a color:</label>
          <select name="colors" id="colors" form="addProductForm">
            <option value="bk">BK</option>
            <option value="golden">Golden</option>
            <option value="white">White</option>
          </select> */}
        </div>
      </div>
    </div>
  );
}
