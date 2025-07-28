"use client";

import { UserRole } from "@/types/auth.types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";

type User =
  | {
      id: string;
      email: string;
      role: string;
    }
  | Record<string, any>;

type AuthState = {
  token: string | null | undefined;
  user: User;
};

interface UserJwtPayload extends JwtPayload {
  email: string;
  role: string;
}

const AuthContext = createContext<AuthState>({
  token: null,
  user: {},
});

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default function AuthProvider({
  children,
  token,
}: PropsWithChildren<{ token: AuthState["token"] }>) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<UserJwtPayload>(token);
      setUser({
        id: decodedToken.sub,
        email: decodedToken.email,
        role: UserRole[decodedToken.role as keyof typeof UserRole],
      });
    }
  }, [token]);

  return <AuthContext value={{ token, user }}>{children}</AuthContext>;
}
