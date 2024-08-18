// https://github.com/hiteshchoudhary/nextjs-fullstack-auth/tree/main
import { type NextRequest, NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";
// import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// start with /admin
const isAdminPath = (path: string) => path.startsWith("/admin");

// ['/login', '/register', '/forgot-password']
const isPublicPath = (path: string) => {
  const publicPaths = ["/login", "/register", "/forgot-password"];
  return publicPaths.includes(path);
};

const middleware = (request: NextRequest) => {
  // @ts-ignore
  const token = request?.nextauth?.token as JWT | undefined;
  const path = request.nextUrl.pathname;

  if (isAdminPath(path) && token && token.role === "student") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isAdminPath(path) && token && token.role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  if (isPublicPath(path) && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
};

export default withAuth(middleware);

export const config = {
  matcher: [
    "/",
    "/belajar/:path*",
    "/admin/:path*",

    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
