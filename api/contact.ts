import { Resend } from "resend";

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 1500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const readString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "robinfrancis186@gmail.com";

  if (!apiKey || !from) {
    return res.status(500).json({ error: "Contact email is not configured." });
  }

  const name = readString(req.body?.name);
  const email = readString(req.body?.email).toLowerCase();
  const message = readString(req.body?.message);

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    !EMAIL_PATTERN.test(email)
  ) {
    return res.status(400).json({ error: "Please check the contact form details." });
  }

  const resend = new Resend(apiKey);
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
    return res.status(502).json({ error: "Message could not be sent right now." });
  }

  return res.status(200).json({ id: data?.id });
}
