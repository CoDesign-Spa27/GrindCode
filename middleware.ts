import { url } from 'inspector';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware (req: NextRequest) {
  const token = await getToken({req,secret:process.env.NEXTAUTH_SECRET});  
 
  if(req.nextUrl.pathname ==="/" && token){
    return NextResponse.redirect(new URL("/dashboard",req.url))
  }

  if(req.nextUrl.pathname ==="/dashboard" && !token){
    return NextResponse.redirect(new URL("/",req.url))

  } if(req.nextUrl.pathname ==="/browse" && !token){
    return NextResponse.redirect(new URL("/",req.url))

  } if(req.nextUrl.pathname ==="/create-room" && !token){
    return NextResponse.redirect(new URL("/",req.url))

  } if(req.nextUrl.pathname ==="/your-rooms" && !token){
    return NextResponse.redirect(new URL("/",req.url))

  } if(req.nextUrl.pathname ==="/edit-room" && !token){
    return NextResponse.redirect(new URL("/",req.url))

  }
  if(req.nextUrl.pathname ==="/rooms" && !token){
    return NextResponse.redirect(new URL("/",req.url))

  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard'], 
};
