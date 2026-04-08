import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/notes', '/predictor']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (!isProtected) return NextResponse.next()

  const token = request.cookies.get('sb-kbvemcucrehepivfnoty-auth-token')?.value

  if (!token) {
    const loginUrl = new URL('/', request.url)
    loginUrl.searchParams.set('login', 'required')
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/notes/:path*', '/predictor/:path*']
}