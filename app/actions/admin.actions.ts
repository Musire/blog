// app/actions/admin.actions.ts
'use server'

import { cookies } from 'next/headers'
import crypto from 'crypto'
import 'server-only'

export async function adminLogin(pin: string) {
  if (!pin) {
    return { success: false, message: 'Invalid PIN' }
  }

  const expectedHash = process.env.ADMIN_TOKEN_HASH
  const cookieName = process.env.ADMIN_COOKIE_NAME

  if (!expectedHash || !cookieName) {
    throw new Error('Missing admin auth environment variables')
  }

  // Hash the provided PIN
  const pinHash = crypto
    .createHash('sha256')
    .update(pin)
    .digest('hex')

  console.log(pinHash, expectedHash)

  // Constant-time comparison
  const isValid =
    pinHash.length === expectedHash.length &&
    crypto.timingSafeEqual(
      Buffer.from(pinHash),
      Buffer.from(expectedHash)
    )

  if (!isValid) {
    return { success: false, message: 'Invalid PIN' }
  }

  // Generate session token
  const payload = JSON.stringify({
    sub: 'admin',
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  })

  const payloadBase64 = Buffer.from(payload).toString('base64')

  const signature = crypto
    .createHmac('sha256', expectedHash) // secret = ADMIN_TOKEN_SECRET
    .update(payloadBase64)
    .digest('hex')

  const token = `${payloadBase64}.${signature}`;

  (await cookies()).set({
    name: cookieName,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return { success: true }
}
