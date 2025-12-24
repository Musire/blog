import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import crypto from 'crypto'

export const config = {
  matcher: ['/admin/:path*'],
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/admin/login'
  return NextResponse.redirect(url)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  const cookieName = process.env.ADMIN_COOKIE_NAME!
  const secret = process.env.ADMIN_TOKEN_HASH!

  const token = request.cookies.get(cookieName)?.value

  if (!token) {
    return redirectToLogin(request)
  }

  const parts = token.split('.')
  if (parts.length !== 2) {
    return redirectToLogin(request)
  }

  const [payloadBase64, signature] = parts

  // Recompute signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payloadBase64)
    .digest('hex')

  // Constant-time compare
  const signaturesMatch =
    signature.length === expectedSignature.length &&
    crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )

  if (!signaturesMatch) {
    return redirectToLogin(request)
  }

  // Decode + validate payload
  let payload: { sub: string; exp: number }

  try {
    payload = JSON.parse(
      Buffer.from(payloadBase64, 'base64').toString('utf8')
    )
  } catch {
    return redirectToLogin(request)
  }

  // Expiration check
  if (Date.now() > payload.exp) {
    return redirectToLogin(request)
  }

  // Optional: subject check
  if (payload.sub !== 'admin') {
    return redirectToLogin(request)
  }

  // If user hits /admin directly and is authenticated → redirect to /admin/post
  if (pathname === '/admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/post'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}


