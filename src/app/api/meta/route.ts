import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // ensures crypto + stable server runtime

type IncomingEvent = {
  event_name?: string; // e.g. "PageView", "Lead", "Purchase"
  event_id?: string; // for dedup with Pixel
  event_time?: number; // unix seconds (optional; server will fill)
  event_source_url?: string;
  action_source?: "website";
  custom_data?: Record<string, any>;
  user?: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    external_id?: string;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  fbp?: string;
  fbc?: string;
  test_event_code?: string; // optional for Events Manager Test Events
};

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function normEmail(email: string) {
  return email.trim().toLowerCase();
}

function normPhone(phone: string) {
  // keep digits only, assume user provides correct country code if needed
  return phone.replace(/[^\d]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const pixelId = process.env.META_PIXEL_ID;
    const token = process.env.META_CAPI_ACCESS_TOKEN;

    if (!pixelId || !token) {
      return NextResponse.json(
        { ok: false, error: "Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as IncomingEvent;

    const event_name = body.event_name || "PageView";
    const event_id = body.event_id || crypto.randomUUID();
    const event_time = body.event_time || Math.floor(Date.now() / 1000);
    const action_source = body.action_source || "website";

    // Try to infer IP/UA from request if not provided
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const ipFromHeader = forwardedFor.split(",")[0]?.trim();
    const uaFromHeader = req.headers.get("user-agent") || undefined;

    const email = body.user?.email ? sha256(normEmail(body.user.email)) : undefined;
    const phone = body.user?.phone ? sha256(normPhone(body.user.phone)) : undefined;
    const fn = body.user?.first_name ? sha256(body.user.first_name.trim().toLowerCase()) : undefined;
    const ln = body.user?.last_name ? sha256(body.user.last_name.trim().toLowerCase()) : undefined;

    const payload: any = {
      data: [
        {
          event_name,
          event_time,
          action_source,
          event_id,
          event_source_url: body.event_source_url,
          custom_data: body.custom_data || {},
          user_data: {
            em: email ? [email] : undefined,
            ph: phone ? [phone] : undefined,
            fn: fn ? [fn] : undefined,
            ln: ln ? [ln] : undefined,
            external_id: body.user?.external_id ? [sha256(body.user.external_id)] : undefined,

            client_ip_address: body.user?.client_ip_address || ipFromHeader,
            client_user_agent: body.user?.client_user_agent || uaFromHeader,

            fbp: body.fbp,
            fbc: body.fbc,
          },
        },
      ],
    };

    // Remove undefined keys cleanly (Meta can be picky)
    const clean = JSON.parse(JSON.stringify(payload));

    if (body.test_event_code) {
      clean.test_event_code = body.test_event_code;
    }

    const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(
      token
    )}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(clean),
    });

    const json = await resp.json();

    return NextResponse.json(
      { ok: resp.ok, meta: json, event_id, event_name },
      { status: resp.ok ? 200 : 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
