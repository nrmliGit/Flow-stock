import httpClient from "@/lib/axios";
import { handleApiError } from "@/lib/utils";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export async function addProduct(formData: FormData) {
  try {
    const res = await httpClient.postForm("/api/product/add", {
      size: formData.get("size"),
      pieceNumber: formData.get("pieceNumber"),
      thumbnail: formData.get("thumbnail"),
      price: parseFloat(formData.get("price")?.toString() ?? ""),
      productModelId: Number(formData.get("productModelId")),
      blockNumber: formData.get("blockNumber"),
      colorId: Number(formData.get("colorId")),
      stock: formData.get("stock"),
    });

    if (res.status === 201) toast.success("Product added successfully");
    return res.data;
  } catch (e) {
    handleApiError(e);
    throw e;
  }
}

export async function softDeleteProduct(id: number) {
  try {
    const res = await httpClient.delete(`/api/product/softdelete/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
}

export function updateProduct(
  formEvent: FormEvent<HTMLFormElement>,
  id: number
) {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.currentTarget);

  const obj = {
    id,
    size: formData.get("size") as string,
    thumbnail: formData.get("thumbnail") as string,
    price: parseFloat(formData.get("price") as string),
    pieceNumber: Number(formData.get("pieceNumber")),
    stock: Number(formData.get("stock")),
    blockNumber: Number(formData.get("blockNumber")),
  };

  console.log("PATCH göndərilən obyekt:", obj);

  httpClient
    .patch("/api/product/update/", obj)
    .then((res) => {
      if (res.status === 200) toast.success(res.data);
    })
    .catch((e) => {
      handleApiError(e);
      throw e;
    });

  return "ok";
}

export const getColorName = (colorId: number) => {
  if (colorId === 1) return "BK";
  if (colorId === 2) return "Golden";
  if (colorId === 3) return "White";
  return "Unknown";
};
