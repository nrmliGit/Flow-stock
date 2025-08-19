"use client";

import { useAuth } from "@/app/contexts/AuthProvider";
import Link from "next/link";

export default function HeaderActions() {
  const { token } = useAuth();

  const handleLogout = async () => {
    const res = await fetch("/logout");
    if (res.ok) {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex items-center gap-5">
      {!token ? (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      ) : (
        <>
          <button
            onClick={handleLogout}
            className="
    px-4 py-1 
    bg-red-100 hover:bg-red-500 
    text-red-800 hover:text-white
    rounded-md
    transition-colors duration-200
    font-medium
    
  "
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
