import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data;

    if (!errorData) {
      toast.error("could not get response");
      return;
    }

    if (typeof errorData === "string") {
      toast.error(errorData);
    } else if (Array.isArray(errorData)) {
      const messages = errorData
        .map((err: any) => err.errorMessage ?? JSON.stringify(err))
        .join(", ");
      toast.error(messages);
    } else if (errorData.errorMessage) {
      toast.error(errorData.errorMessage);
    } else if (errorData.message) {
      toast.error(errorData.message);
    } else {
      toast.error("Unknown server error");
      console.error("Unhandled error format:", errorData);
    }
  } else {
    toast.error("Unexpected error");
    console.error("Unknown Error:", error);
  }
}
