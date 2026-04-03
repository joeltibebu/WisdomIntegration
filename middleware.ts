import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const role = req.nextauth.token?.role

    if (pathname.startsWith('/dashboard/parent') && role !== 'PARENT') {
      return role ? NextResponse.json({ error: 'Forbidden' }, { status: 403 }) : NextResponse.redirect(new URL('/auth/login', req.url))
    }
    if (pathname.startsWith('/dashboard/therapist') && role !== 'THERAPIST') {
      return role ? NextResponse.json({ error: 'Forbidden' }, { status: 403 }) : NextResponse.redirect(new URL('/auth/login', req.url))
    }
    if (pathname.startsWith('/dashboard/admin') && role !== 'ADMIN') {
      return role ? NextResponse.json({ error: 'Forbidden' }, { status: 403 }) : NextResponse.redirect(new URL('/auth/login', req.url))
    }
    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      return role ? NextResponse.json({ error: 'Forbidden' }, { status: 403 }) : NextResponse.redirect(new URL('/auth/login', req.url))
    }
    return NextResponse.next()
  },
  { callbacks: { authorized: ({ token }) => !!token } }
)

export const config = { matcher: ['/dashboard/:path*', '/admin/:path*'] }
