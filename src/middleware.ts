import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/jobs/signin" || path === "/jobs/signup" || "/" ; 
    const isCompanyPublicPath = path === "/company/signin" || path === "/company/signup" || "/";

  const job_token = request.cookies.get("job_token")?.value || "";
  console.log('token : ' , job_token); 

  const company_token = request.cookies.get("company_token")?.value || ""; 
  console.log('company token : ' , company_token);




  if (isCompanyPublicPath && company_token) {
    return NextResponse.redirect(new URL("/company/profile", request.nextUrl));
  }

  if (!isCompanyPublicPath && !company_token) {
    return NextResponse.redirect(new URL("/company/signin", request.nextUrl));
  }
  
  if (isPublicPath && job_token) {
    return NextResponse.redirect(new URL("/jobs/profile", request.nextUrl));
  }

  if (!isPublicPath && !job_token) {
    return NextResponse.redirect(new URL("/jobs/signin", request.nextUrl));
  }
}
export const config = {
  matcher: ["/", "/jobs/signin", "/jobs/signup"],
};