"use client";

import { useActionState, useEffect } from "react";
import { register } from "./actions";
import Link from "next/link";
import toast from "react-hot-toast";
import { RegisterResult } from "@/types/auth.types";

export default function Register() {
  const initialState: RegisterResult = { status: "", message: "" };
  const [state, action, loading] = useActionState(register, initialState);

  useEffect(() => {
    if (!state) return;
    if (state.status === "ok") {
      window.location.href = "/login";
    } else if (state.status === "fail" && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <section className="min-h-[calc(100dvh_-_300px)] grid place-items-center">
      <div className="w-[450px]">
        <h1 className="text-3xl mb-6 text-center">Register</h1>
        <form
          action={action}
          className=" border border-blue-300 py-6 px-5 rounded-md"
        >
          <div className="border-2 border-gray-200 mb-4 rounded-md">
            <input
              type="text"
              name="fullname"
              placeholder="Fullname"
              className="p-2"
            />
          </div>
          <div className="border-2 border-gray-200 mb-4 rounded-md">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2"
            />
          </div>
          <div className="border-2 border-gray-200 mb-4 rounded-md">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded-md disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none"
          >
            {loading ? "Processing..." : "Complete"}
          </button>
          <Link href="/login" className="block text-center mt-4 text-blue-600">
            Already have account? Login
          </Link>
        </form>
      </div>
    </section>
  );
}
