import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getUserToken() {
  const myCookies = await cookies()
  const decodedToken = myCookies.get("next-auth.session-token")?.value || myCookies.get("__Secure-next-auth.session-token")?.value
  const token = await decode({ token: decodedToken, secret: process.env.AUTH_SECRET! })
  return token?.token
}

export async function getUserId() {
  const myCookies = await cookies()
  const decodedToken = myCookies.get("next-auth.session-token")?.value || myCookies.get("__Secure-next-auth.session-token")?.value
  const token = await decode({ token: decodedToken, secret: process.env.AUTH_SECRET! })

  if (token?.id) return token.id as string;

  // Fallback for existing sessions: decode the API token
  if (token?.token && typeof token.token === 'string') {
    try {
      const decoded: { id: string } = jwtDecode(token.token);
      return decoded.id;
    } catch (error) {
      console.error("Fallback decoding failed", error);
    }
  }

  return null
}