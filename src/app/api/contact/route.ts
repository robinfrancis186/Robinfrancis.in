import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "crypto";
import { Resend } from "resend";

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 1500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

let resendClient: Resend | null = null;
const submissionAttempts = new Map<string, { count: number; resetAt: number }>();
const isProduction = process.env.NODE_ENV === "production";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const readString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  return request.headers.get("x-real-ip") || "unknown";
};

const getRateLimitKey = (value: string) =>
  `contact:${createHash("sha256").update(value).digest("hex").slice(0, 24)}`;

const isMemoryRateLimited = (key: string) => {
  const now = Date.now();

  for (const [attemptKey, attempt] of submissionAttempts) {
    if (attempt.resetAt <= now) {
      submissionAttempts.delete(attemptKey);
    }
  }

  const current = submissionAttempts.get(key);
  if (!current || current.resetAt <= now) {
    submissionAttempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  return false;
};

const runRedisCommand = async <T>(command: unknown[]) => {
  const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    if (isProduction) {
      throw new Error("Redis contact rate limiting is not configured.");
    }

    return null;
  }

  const headers = {
    Authorization: `Bearer ${redisToken}`,
    "Content-Type": "application/json",
  };

  const normalizedUrl = redisUrl.replace(/\/$/, "");
  const response = await fetch(normalizedUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis rate-limit command failed with ${response.status}`);
  }

  return (await response.json()) as { result?: T };
};

const isRedisRateLimited = async (key: string) => {
  const increment = await runRedisCommand<number>(["INCR", key]);

  if (!increment) {
    return null;
  }

  const payload = increment;
  const count = Number(payload.result);

  if (count === 1) {
    await runRedisCommand<number>(["EXPIRE", key, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)]);
  }

  return count > MAX_SUBMISSIONS_PER_WINDOW;
};

const isRateLimited = async (value: string) => {
  const key = getRateLimitKey(value);

  try {
    const redisResult = await isRedisRateLimited(key);
    if (redisResult !== null) {
      return redisResult;
    }
  } catch (error) {
    if (isProduction) {
      throw error;
    }

    console.warn("Redis contact rate limit unavailable; falling back to memory.", error);
  }

  return isMemoryRateLimited(key);
};

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = readString(payload.name);
  const email = readString(payload.email).toLowerCase();
  const message = readString(payload.message);
  const website = readString(payload.website);

  if (website) {
    return NextResponse.json({ error: "Message could not be sent right now." }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    !EMAIL_PATTERN.test(email)
  ) {
    return NextResponse.json({ error: "Please check the contact form details." }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  let ipLimited = false;
  let emailLimited = false;

  try {
    [ipLimited, emailLimited] = await Promise.all([
      isRateLimited(`ip:${clientIp}`),
      isRateLimited(`email:${email}`),
    ]);
  } catch (error) {
    console.error("Contact rate limit unavailable", error);
    return NextResponse.json({ error: "Contact form is temporarily unavailable." }, { status: 503 });
  }

  if (ipLimited || emailLimited) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      { status: 429 }
    );
  }

  const resend = getResend();
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "robinfrancis186@gmail.com";

  if (!resend || !from) {
    return NextResponse.json({ error: "Contact email is not configured." }, { status: 500 });
  }

  const subject = `Portfolio contact from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
      <h1 style="font-size:20px;margin:0 0 16px">New portfolio contact</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space:pre-wrap;border-left:3px solid #2563eb;padding-left:16px">${escapeHtml(message)}</div>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("Resend contact error", error);
    return NextResponse.json({ error: "Message could not be sent right now." }, { status: 502 });
  }

  return NextResponse.json({ id: data?.id });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
