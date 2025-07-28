import httpClient from "@/lib/axios";
import axios from "axios";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export function addCustomer(formEvent: FormEvent<HTMLFormElement>) {
  formEvent.preventDefault();
  const formData = new FormData(formEvent.currentTarget);

  const response = httpClient
    .post("/api/customers/add", {
      name: formData.get("name"),
      phone: formData.get("phone"),
    })
    .then((res) => {
      if (res.status === 201) toast.success("Customer added Successfully");
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
