import httpClient from "@/lib/axios";
import axios from "axios";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export function addProduct(formEvent: FormEvent<HTMLFormElement>) {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.currentTarget);
  const response = httpClient
    .postForm("/api/product/add", {
      size: formData.get("size"),
      pieceNumber: formData.get("pieceNumber"),
      thumbnail: formData.get("thumbnail"),
      price: parseFloat(formData.get("price")?.toString() ?? ""),
      productModelId: Number(formData.get("models")),
      blockNumber: formData.get("blockNumber"),
      colorId: Number(formData.get("colors")),
      stock: formData.get("stock"),
    })
    .then((res) => {
      if (res.status === 201) toast.success("Product added Successfully");
    })
    .catch((e) => {
      if (axios.isAxiosError(e)) toast.error(e.response?.data);
      else {
        //  toast.error("Something went wrong");
        console.error("Unknown Error:", e);
      }
    });

  return "ok";
}

export function softDeleteProduct(id: number) {
  const response = httpClient.delete(`/api/product/softdelete/${id}`);
}

export function updateProduct(
  formEvent: FormEvent<HTMLFormElement>,
  id: number
) {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.currentTarget);
  const obj = {
    id,
    size:
      formData.get("size") !== ""
        ? formData.get("size")
        : formEvent.currentTarget.size.placeholder,
    pieceNumber:
      formData.get("pieceNumber") !== ""
        ? formData.get("pieceNumber")
        : formEvent.currentTarget.pieceNumber.placeholder,
    thumbnail:
      formData.get("thumbnail") !== ""
        ? formData.get("thumbnail")
        : formEvent.currentTarget.thumbnail.placeholder,
    price: parseFloat(
      formData.get("price") !== ""
        ? formData.get("price")
        : formEvent.currentTarget.price.placeholder
    ),
    blockNumber:
      formData.get("blockNumber") !== ""
        ? formData.get("blockNumber")
        : formEvent.currentTarget.blockNumber.placeholder,
    stock:
      formData.get("stock") !== ""
        ? formData.get("stock")
        : formEvent.currentTarget.stock.placeholder,
  };

  //console.log(obj);
  httpClient
    .patch("/api/product/update/", obj)
    .then((res) => {
      if (res.status === 200) toast.success(res.data);
    })
    .catch((e) => {
      if (axios.isAxiosError(e)) toast.error(e.response?.data);
      else {
        //toast.error("Something went wrong");
        console.error("Unknown Error:", e);
      }
    });

  return "ok";
}
