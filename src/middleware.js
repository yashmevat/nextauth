import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path==="/login" || path==="/signup" || path==="/verifyemail"
  const token = request.cookies.get("token")?.value || ""
  
  if(isPublicPath && token){
      return NextResponse.redirect(new URL('/profile', request.url))
  }
   if(!isPublicPath && !token){
      return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next();
}
 
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verifyemail",
    "/profile"
  ],
}