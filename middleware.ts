import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// add more future routes to this
const protectedRoutes = [
  "/profile", "/settings", "/news"
];

export async function middleware(request: NextRequest) {
  // Convert NextRequest to a format compatible with getToken
  const req = {
    headers: Object.fromEntries(request.headers.entries()),
    cookies: Object.fromEntries(
      request.cookies.getAll().map(cookie => [cookie.name, cookie.value])
    ),
    url: request.url,
  } as any; // Temporary any to satisfy getToken's type requirements

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
// where to apply this middle ware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/news"
  ],
};