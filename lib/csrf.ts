import { NextRequest } from "next/server";

/**
 * Returns true if the request originates from the same host.
 * Checks Origin header first, falls back to Referer.
 * If neither is present (e.g. server-to-server or curl) we allow it —
 * the httpOnly + sameSite:strict cookie already blocks cross-origin browsers.
 */
export function isSameOrigin(request: NextRequest): boolean {
  const host = request.headers.get("host");
  if (!host) return false;

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return true; // no Origin/Referer — non-browser client, allow
}
