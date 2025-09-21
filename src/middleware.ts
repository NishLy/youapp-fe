import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("x-access-token")?.value;
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // Clone headers and attach token if available
  const requestHeaders = new Headers(req.headers);
  if (token) {
    requestHeaders.set("x-access-token", token);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/login", "/profile/:path*", "/api/profile/:path*"],
};
