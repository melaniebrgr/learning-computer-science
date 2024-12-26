import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
const protectedRoutes = ['/chat']
const publicRoutes = ['/login', '/about', '/']
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  
  if (isPublicRoute) {
    NextResponse.next()
  }
  
  const userId = (await cookies()).get('nc-user')?.value

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}