"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function register(_: unknown, formData: FormData) {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        password: formData.get("password"),
      }
    );

    console.log("API Response:", data);

    return { status: "ok" };
  } catch (error: any) {
    console.error("Register Error:", error.response?.data);

    const errors = error.response?.data;
    const message = Array.isArray(errors)
      ? errors.map((e: any) => e.errorMessage).join("\n")
      : "User is already exists";

    return { status: "fail", message };
  }
}
