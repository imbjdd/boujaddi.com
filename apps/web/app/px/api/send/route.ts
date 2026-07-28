import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const UMAMI_ENDPOINT = "https://gateway.umami.is/api/send";

/**
 * Umami Cloud sits behind Cloudflare, and its IP lookup reads
 * `cf-connecting-ip` long before `x-forwarded-for`. That header is minted by
 * *its* edge from whoever opened the connection — which, once we proxy, is this
 * server. So forwarding headers is not enough: every visitor would geolocate to
 * the Railway region, and because Umami derives the session id from
 * uuid(sourceId, ip, userAgent, salt), a constant IP would also collapse
 * everyone sharing a user-agent into a single session.
 *
 * Sending an explicit `payload.ip` is the documented escape hatch: Umami then
 * skips the provider geo headers entirely and does its own lookup on the value
 * we pass.
 */
function getClientIp(req: NextRequest): string | undefined {
  // Set by our own Cloudflare zone and not client-settable, so it wins.
  const cf = req.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;

  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;

  return req.headers.get("x-real-ip")?.trim() || undefined;
}

export async function POST(req: NextRequest) {
  let body: { payload?: Record<string, unknown> };

  try {
    body = await req.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  if (!body?.payload || typeof body.payload !== "object") {
    return new Response("Bad Request", { status: 400 });
  }

  const ip = getClientIp(req);
  // Umami runs isbot() on this and silently discards the hit when it looks
  // wrong, so the visitor's real one has to survive the hop — Node's default
  // fetch agent string would get every pageview dropped.
  const userAgent = req.headers.get("user-agent") ?? "";
  const cacheToken = req.headers.get("x-umami-cache");

  const upstream = await fetch(UMAMI_ENDPOINT, {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      ...(userAgent && { "user-agent": userAgent }),
      ...(cacheToken && { "x-umami-cache": cacheToken }),
    },
    // Ours are spread last: a hostile client can't forge its own ip. Cookies
    // are deliberately not forwarded — a bare rewrite would have sent them.
    body: JSON.stringify({
      ...body,
      payload: {
        ...body.payload,
        ...(ip && { ip }),
        ...(userAgent && { userAgent }),
      },
    }),
  });

  // The tracker reads `cache` and `disabled` off this response, so it has to
  // come back intact rather than being swallowed.
  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
}
