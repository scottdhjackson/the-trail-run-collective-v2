import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  const validUsername = process.env.ADMIN_USERNAME
  const validPassword = process.env.ADMIN_PASSWORD

  // If credentials aren't configured, block access entirely
  if (!validUsername || !validPassword) {
    return new NextResponse('Admin access not configured', { status: 503 })
  }

  const unauthorized = new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"' },
  })

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorized
  }

  const base64 = authHeader.slice(6)
  const decoded = atob(base64)
  const colonIndex = decoded.indexOf(':')
  if (colonIndex === -1) return unauthorized

  const username = decoded.slice(0, colonIndex)
  const password = decoded.slice(colonIndex + 1)

  if (username !== validUsername || password !== validPassword) {
    return unauthorized
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin-data/:path*'],
}
