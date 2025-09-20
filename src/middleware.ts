import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("x-access-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  req.headers.set("x-access-token", token!);

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/api/profile/:path*"],
};
