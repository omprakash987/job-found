import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/jobs/signin" || path === "/jobs/signup" || "/"; 
  const token = request.cookies.get("token")?.value || "";
  console.log('token : ' , token); 

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/jobs/home", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/jobs/signin", request.nextUrl));
  }
}
export const config = {
  matcher: ["/", "/jobs/signin", "/jobs/signup"],
};