import nodemailer, { Transporter } from "nodemailer";
import { env } from "../config/env";
import { logger } from "../utils/logger";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE_BOOL,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }
  return transporter;
}

interface SendMailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

async function sendMail({ to, subject, html, text }: SendMailInput): Promise<boolean> {
  const client = getTransporter();
  if (!client) {
    logger.warn("SMTP not configured; skipping email send", { to, subject });
    return false;
  }

  try {
    await client.sendMail({
      from: env.MAIL_FROM || env.SMTP_USER,
      to,
      subject,
      html,
      text: text ?? html.replace(/<[^>]+>/g, ""),
    });
    return true;
  } catch (err) {
    logger.error("Failed to send email", { error: (err as Error).message, to, subject });
    return false;
  }
}

function wrapTemplate(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; background:#f6f7fb; padding:24px;">
      <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;">
        <h2 style="color:#0f4c3a;margin-top:0;">${title}</h2>
        ${bodyHtml}
        <p style="color:#94a3b8;font-size:12px;margin-top:32px;">${env.APP_NAME}</p>
      </div>
    </body>
  </html>`;
}

async function sendOtpEmail(to: string, otp: string): Promise<boolean> {
  const html = wrapTemplate(
    "Your verification code",
    `<p>Use the code below to verify your account. This code expires in 10 minutes.</p>
     <p style="font-size:28px;font-weight:700;letter-spacing:4px;">${otp}</p>`,
  );
  return sendMail({ to, subject: `${env.APP_NAME} — Your verification code`, html });
}

async function sendResetPasswordEmail(to: string, resetUrl: string): Promise<boolean> {
  const html = wrapTemplate(
    "Reset your password",
    `<p>We received a request to reset your password. Click the button below to continue. This link expires in 30 minutes.</p>
     <p><a href="${resetUrl}" style="background:#0f4c3a;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">Reset Password</a></p>
     <p style="font-size:12px;color:#64748b;">If you did not request this, you can safely ignore this email.</p>`,
  );
  return sendMail({ to, subject: `${env.APP_NAME} — Reset your password`, html });
}

async function sendBookingConfirmationEmail(
  to: string,
  data: { bookingCode: string; trekTitle: string; departureDate: string; amount: number },
): Promise<boolean> {
  const html = wrapTemplate(
    "Booking confirmed!",
    `<p>Thank you for booking with us. Here are your booking details:</p>
     <table style="width:100%;font-size:14px;">
       <tr><td style="padding:4px 0;color:#64748b;">Booking code</td><td style="text-align:right;font-weight:600;">${data.bookingCode}</td></tr>
       <tr><td style="padding:4px 0;color:#64748b;">Trek</td><td style="text-align:right;font-weight:600;">${data.trekTitle}</td></tr>
       <tr><td style="padding:4px 0;color:#64748b;">Departure</td><td style="text-align:right;font-weight:600;">${data.departureDate}</td></tr>
       <tr><td style="padding:4px 0;color:#64748b;">Amount paid</td><td style="text-align:right;font-weight:600;">₹${data.amount.toLocaleString("en-IN")}</td></tr>
     </table>`,
  );
  return sendMail({ to, subject: `Booking Confirmed — ${data.bookingCode}`, html });
}

async function sendEnquiryNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  trekTitle?: string;
  message?: string;
}): Promise<boolean> {
  if (!env.ENQUIRY_EMAIL) return false;
  const html = wrapTemplate(
    "New trek enquiry",
    `<p><strong>Name:</strong> ${data.name}</p>
     <p><strong>Email:</strong> ${data.email}</p>
     <p><strong>Phone:</strong> ${data.phone}</p>
     ${data.trekTitle ? `<p><strong>Trek:</strong> ${data.trekTitle}</p>` : ""}
     ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ""}`,
  );
  return sendMail({ to: env.ENQUIRY_EMAIL, subject: `New enquiry from ${data.name}`, html });
}

export const emailService = {
  sendMail,
  sendOtpEmail,
  sendResetPasswordEmail,
  sendBookingConfirmationEmail,
  sendEnquiryNotificationEmail,
};
