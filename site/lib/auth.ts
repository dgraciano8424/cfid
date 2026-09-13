import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'cfid_admin';
const MAX_AGE_SECONDS = 60 * 60 * 8;

const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set');
  return secret;
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Buffer.from(digest).toString('base64url');
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return Buffer.from(signature).toString('base64url');
}

// Both values are fixed-length digests, so this compares in constant time.
function digestsMatch(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function isAuthConfigured() {
  return Boolean(process.env.AUTH_SECRET && process.env.ADMIN_PASSWORD);
}

export async function checkPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return digestsMatch(await sha256(candidate), await sha256(expected));
}

export async function createSession() {
  const expiresAt = String(Date.now() + MAX_AGE_SECONDS * 1000);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${expiresAt}.${await sign(expiresAt)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isLoggedIn() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature) return false;
  if (!digestsMatch(signature, await sign(expiresAt))) return false;

  return Number(expiresAt) > Date.now();
}

export async function requireAdmin() {
  if (!(await isLoggedIn())) redirect('/admin/login');
}
