import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from './app/_lib/session'
 
// Protected and public routes
const protectedRoutes = [
  '/dashboard'
]
const publicRoutes = [
  '/login',
  '/signup',
  '/'
]
 
export default async function middleware(req: NextRequest) {
  // 1. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  
  // 2. Get userId from session
  const sessionId = await verifySession()
  // 3. If the session is active, update session
  // if (sessionId) await updateSession(<string>sessionId) 

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !sessionId) {

    return NextResponse.redirect(new URL('/login', req.url))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    sessionId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}