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
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
