import nodemailer from "nodemailer";

import { siteConfig } from "@/config/site";

export interface EnquiryEmailPayload {
  subject: string;
  type: "booking" | "enquiry" | "callback" | "exit-offer" | "payment";
  fields: Record<string, string | number | boolean | null | undefined>;
  html?: string;
}

export const ENQUIRY_EMAIL =
  process.env.ENQUIRY_EMAIL?.trim() ||
  siteConfig.enquiryEmail ||
  "indiaholidaydestinations.in@gmail.com";

function formatFields(fields: EnquiryEmailPayload["fields"]): string {
  return Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join("\n");
}

function buildHtml(payload: EnquiryEmailPayload, text: string): string {
  if (payload.html) return payload.html;

  const rows = Object.entries(payload.fields)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e8ece6;font-weight:600;color:#333;">${key}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e8ece6;color:#1a1a1a;">${String(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#f4f6f3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e4ebe0;overflow:hidden;">
    <tr>
      <td style="background:#2D5A27;color:#fff;padding:20px 24px;">
        <div style="font-size:12px;opacity:.85;text-transform:uppercase;letter-spacing:.06em;">${siteConfig.name}</div>
        <div style="font-size:20px;font-weight:700;margin-top:6px;">${payload.subject}</div>
        <div style="font-size:13px;margin-top:6px;opacity:.9;">Type: ${payload.type}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 12px;">
        <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        <pre style="white-space:pre-wrap;font-size:12px;color:#666;padding:12px;">${text}</pre>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Sends enquiry/booking mail to indiaholidaydestinations.in@gmail.com via Gmail SMTP.
 * Requires env: SMTP_USER, SMTP_PASS (Gmail App Password).
 */
export async function sendBrandEmail(
  payload: EnquiryEmailPayload,
): Promise<{ ok: boolean; message: string }> {
  const text = formatFields(payload.fields);
  const html = buildHtml(payload, text);

  const smtpUser = process.env.SMTP_USER?.trim() || ENQUIRY_EMAIL;
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpHost = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);

  if (!smtpPass) {
    console.error("[email] SMTP_PASS missing — cannot send enquiry email");
    return {
      ok: false,
      message:
        "Email service is not configured yet. Please WhatsApp us or try again shortly.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const replyTo =
      typeof payload.fields.email === "string" && payload.fields.email.includes("@")
        ? payload.fields.email
        : undefined;

    await transporter.sendMail({
      from: `"${siteConfig.name}" <${smtpUser}>`,
      to: ENQUIRY_EMAIL,
      replyTo,
      subject: `[IHD Treks] ${payload.subject}`,
      text,
      html,
    });

    return { ok: true, message: "Enquiry delivered" };
  } catch (error) {
    console.error("[email] SMTP send failed", error);
    return {
      ok: false,
      message: `Could not send email right now. Please write to ${ENQUIRY_EMAIL}.`,
    };
  }
}
