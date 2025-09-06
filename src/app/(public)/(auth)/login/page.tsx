"use client";
import { useActionState, useLayoutEffect } from "react";
import { login } from "./actions";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const [state, action, loading] = useActionState(login, "");

  useLayoutEffect(() => {
    if (state === "ok") window.location.href = "/dashboard";
    else if (state === "fail") {
      toast.error("Email/Password is incorrect");
    }
  }, [state]);
  return (
    <section className="min-h-[calc(100dvh_-_300px)] grid place-items-center">
      <div className="w-[450px]">
        <h1 className="text-3xl mb-6 text-center">Login</h1>
        <form
          action={action}
          className=" border border-blue-300 py-6 px-5 rounded-md"
        >
          <div className="border-2 border-gray-200 mb-4  rounded-md">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 w-full"
            />
          </div>
          <div className="border-2 border-gray-200 mb-4  rounded-md">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 w-full"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white p-2 w-full  disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none  rounded-md"
          >
            {loading ? "Processing..." : "Log in"}
          </button>

          <Link
            href="/register"
            className="block text-center mt-4 text-blue-600"
          >
            {" "}
            Create new account
          </Link>
        </form>
      </div>
    </section>
  );
}
