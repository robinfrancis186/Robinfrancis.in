import { Resend } from 'resend';

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 1500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
}

function sanitize(value) {
  return String(value || '').trim();
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  let body;
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {};
  } catch {
    sendJson(response, 400, { error: 'Invalid JSON payload.' });
    return;
  }
  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const message = sanitize(body.message);

  if (!name || !email || !message) {
    sendJson(response, 400, { error: 'Name, email, and message are required.' });
    return;
  }

  if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    sendJson(response, 400, { error: 'One or more fields are too long.' });
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    sendJson(response, 400, { error: 'Enter a valid email address.' });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    sendJson(response, 500, { error: 'Contact form is not configured yet.' });
    return;
  }

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (!error) {
      sendJson(response, 200, { ok: true });
      return;
    }
  } catch {
    // Keep the public response generic; delivery details belong in provider logs.
  }

  sendJson(response, 502, { error: 'Email delivery failed. Please try again later.' });
}
