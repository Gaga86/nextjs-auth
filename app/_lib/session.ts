import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/_lib/definitions'
import { cookies } from 'next/headers'
import prisma from '@/app/_lib/client'
import { sevenDaysFromNow } from '@/app/_lib/utils'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Failed to verify session', error)
  }
}

export async function verifySession() {
  // Get session from cookie
  const encryptedSession = cookies().get('session')?.value

  if (!encryptedSession) return null

  const decryptedSession = await decrypt(encryptedSession)
  
  if (!decryptedSession) return null
 
  if (!decryptedSession.sessionId) return null
 
  return decryptedSession.sessionId
}

export async function createSession(userId: string) {
  const expiresAt = sevenDaysFromNow()

  // 1. Create a session in the database
  const session = await prisma.Session.create({
    data: {
      userId,
      expiresAt,
    }
  })

  const sessionId = session.id
 
  // 2. Encrypt the session ID
  const encryptedSession = await encrypt({ sessionId, expiresAt })
 
  // 3. Store the session in cookies for optimistic auth checks
  setSessionCookie(encryptedSession, expiresAt)
}

export async function updateSession(sessionId: string, expiresAt: Date) {
  // Update session in the database
  await prisma.Session.update({
    where: {
      id: sessionId,
    },
    data: {
      expiresAt: expiresAt,
    },
  })

  // Encrypt the session ID
  const updatedSession = await encrypt({ sessionId, expiresAt })
  
  setSessionCookie(updatedSession, expiresAt)
}

export async function deleteSession() {
  
  // 1. Get the sessionId
  const sessionId = await verifySession()

  if (sessionId) {
    // 2. Delete session from the DB
    await prisma.Session.delete({
      where: {
        id: sessionId,
      },
    })
  }

  // 3. delete the session from the browser
  cookies().delete('session')
}

export async function getUserIdFromSession() {
  // 1. Get session from cookie
  const sessionId = await verifySession()
 
  if (!sessionId) return null

  // 2. Get userId from session
  const userId = await prisma.Session.findUnique({
    where: {
      id: sessionId,
    },
    select: {
      userId: true,
    },
  })

  return userId
}

export function setSessionCookie(encryptedSession: string, expiresAt: Date) {
  cookies().set('session', encryptedSession, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}