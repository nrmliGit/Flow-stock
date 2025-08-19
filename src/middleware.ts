import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register", "/"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = (await cookies()).get("token")?.value;

  const isPublicRoute = publicRoutes.some((route) => route.includes(path));

  if (!isPublicRoute && !token)
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/", "/dashboard/:path*"],
};
