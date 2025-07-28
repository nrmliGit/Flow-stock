"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function login(_: unknown, formData: FormData) {
  try {
    const { data } = await axios.post("http://localhost:5000/api/auth/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    console.log("API Response:", data);

    if (data.token) {
      (await cookies()).set("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      return "ok";
    }
    return "fail";
  } catch (error: any) {
    console.error("Login Error:", error.response?.data);

    return "fail";
  }
}
