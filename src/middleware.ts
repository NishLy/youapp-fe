import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("x-access-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Clone headers and set the token
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-access-token", token);

  // Forward request with new headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/api/profile/:path*"],
};
