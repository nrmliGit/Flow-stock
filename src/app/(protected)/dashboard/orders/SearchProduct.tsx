"use client";

import httpClient from "@/lib/axios";
import { cn } from "@/lib/utils";
import { OrderProductType } from "@/types/order.types";
import { ProductJoin } from "@/types/product.types";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function SearchProduct({
  selectedProducts,
  setSelectedProducts,
  ...props
}: {
  setDisabled: (value: React.SetStateAction<boolean>) => void;
  selectedProducts: Array<ProductJoin & Omit<OrderProductType, "id">>;
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<Array<ProductJoin & Omit<OrderProductType, "id">>>
  >;
}) {
  const [isVisibleProductsContainer, setVisibleProductsContainer] =
    useState<boolean>(true);

  const [products, setProducts] = useState<Array<ProductJoin> | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const productOptionsRef = useRef<Omit<OrderProductType, "id">>({
    unit: 1,
    price: NaN,
    quantity: 1,
  });

  useEffect(() => {
    const listener = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setVisibleProductsContainer(false);
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);

  const handleChange = async (value: string) => {
    if (value === "") setProducts(null);
    else {
      setProducts([]);
      setVisibleProductsContainer(true);

      try {
        const response = await httpClient.get(`/api/product/group/${value}`);
        setProducts(response.data);
      } catch {
        setProducts(null);
        setVisibleProductsContainer(false);
      }
    }
  };

  const handleSelectedProduct = (product: ProductJoin & OrderProductType) => {
    setSelectedProducts((state) => {
      if (!state.some((sp) => sp.id === product.id)) return [...state, product];
      else return state.filter((sp) => sp.id !== product.id);
    });
    productOptionsRef.current = {
      unit: 1,
      price: NaN,
      quantity: 1,
    };
  };

  const removeSelectedProduct = (id: number) =>
    setSelectedProducts((state) => state.filter((sp) => sp.id !== id));

  return (
    <div className="relative">
      <div className="border-2 border-gray-200 mb-4  rounded-md">
        {selectedProducts.length > 0 ? (
          <div className="p-2">
            <ul className="flex flex-wrap items-center gap-1">
              {selectedProducts.map((p, index) => (
                <li key={index} className="relative px-2 py-1">
                  <span>
                    {p.size}-{p.product_model_name}-{p.product_color_name}
                  </span>
                  <button
                    onClick={() => removeSelectedProduct(p.id)}
                    className="rounded-md absolute -top-2 -right-2 [&>svg]:w-4 [&>svg]:h-4 bg-red-600 text-white"
                  >
                    <XIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <input
          ref={inputRef}
          onChange={(e) => {
            if (e.target.value.length) {
              props.setDisabled(false);
            } else props.setDisabled(true);
            handleChange(e.target.value);
          }}
          type="text"
          placeholder="Enter product name"
          className="p-2 w-full"
        />
      </div>

      {products !== null && isVisibleProductsContainer ? (
        <div
          ref={containerRef}
          className="bg-white absolute top-[calc(100%_+_5px)] w-full border-2 border-gray-200 shadow-md rounded-md  max-h-62.5 z-1 overflow-auto"
        >
          {products.length > 0 ? (
            <ul>
              {products.map((p, index) => {
                const isSelectedProduct = selectedProducts.some(
                  (sp) => sp.id === p.id
                );
                return (
                  <li
                    key={index}
                    className={cn(
                      "flex justify-between p-2 gap-5",
                      isSelectedProduct ? "bg-gray-100" : "hover:bg-gray-100"
                    )}
                  >
                    <div className="flex-1 grid grid-cols-[3fr_2fr] ">
                      <div className="grow ">
                        <p className="mb-2 ">
                          <span className="text-[14px] text-gray-600">
                            {" "}
                            Name:
                          </span>{" "}
                          <span className="font-medium text-[16px]">
                            {p.size}-{p.product_model_name}
                          </span>
                        </p>
                        <p>
                          <span className="text-[14px] text-gray-600">
                            Color:
                          </span>{" "}
                          <span className="font-medium text-[16px]">
                            {p.product_color_name}
                          </span>
                        </p>
                      </div>
                      <div className="grid gap-y-2">
                        <div className="flex gap-x-2">
                          <span className="text-[14px] text-gray-600">
                            Unit:
                          </span>
                          <select
                            className="border border-gray-200"
                            onChange={(e) => {
                              productOptionsRef.current = {
                                ...productOptionsRef.current,
                                unit: e.target.value
                                  ? Number(e.target.value)
                                  : 1,
                              };
                            }}
                          >
                            <option value="1">Box</option>
                            <option value="2">Block</option>
                          </select>
                        </div>
                        <div className="flex gap-x-2">
                          <span className="whitespace-nowrap text-[14px] text-gray-600">
                            Price (optional):
                          </span>
                          <input
                            type="text"
                            placeholder={`${p.price}`}
                            className="w-25 border border-gray-200"
                            onChange={({ target: { value } }) => {
                              productOptionsRef.current = {
                                ...productOptionsRef.current,
                                price:
                                  value === "" ? p.price : parseFloat(value),
                              };
                            }}
                          />
                        </div>
                        <div className="flex gap-x-2">
                          <span className="whitespace-nowrap text-[14px] text-gray-600">
                            Quantity:
                          </span>
                          <input
                            type="number"
                            placeholder="1"
                            className="w-25 border border-gray-200"
                            onChange={(e) => {
                              productOptionsRef.current = {
                                ...productOptionsRef.current,
                                quantity: Number(e.target.value) ?? 1,
                              };
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="[&>svg]:w-5 [&>svg]:h-5 border-2 border-gray-200 h-full px-1 rounded-sm "
                        onClick={() => {
                          handleSelectedProduct({
                            ...p,
                            quantity: productOptionsRef.current.quantity ?? 1,
                            unit: productOptionsRef.current.unit,
                            price: !Number.isNaN(
                              productOptionsRef.current.price
                            )
                              ? productOptionsRef.current.price
                              : p.price,
                          });
                          if (inputRef.current) inputRef.current.value = "";
                        }}
                      >
                        {isSelectedProduct ? <MinusIcon /> : <PlusIcon />}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="h-25 grid place-items-center">loading...</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
