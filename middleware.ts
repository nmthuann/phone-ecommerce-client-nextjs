import { NextRequest, NextResponse } from 'next/server'

import { cookies } from 'next/headers'

const publicRoutes = ['/login', '/register', '/']
const protectedRoutes = ['/accounts', '/cart', '/checkout']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get('access_token')?.value
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute && cookie && path === '/login') {
    // !req.nextUrl.pathname.startsWith('/accounts')
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
