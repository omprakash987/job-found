// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = ['/auth/user/signin', '/auth/user/signup', '/auth/company/signin', '/auth/company/signup'];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    
    if (publicPaths.includes(path)) {
        return NextResponse.next();
    }

    const cookieHeader = request.headers.get("cookie");
    const token = cookieHeader?.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || undefined;
    console.log('token: ' , token); 

    if (!token) {
        return NextResponse.redirect(new URL('/user/signup', request.url));
    }

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

