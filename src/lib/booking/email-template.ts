import { siteConfig } from "@/config/site";
import { formatCurrency, formatDate } from "@/utils";

export interface BookingEmailData {
  bookingId: string;
  trekTitle: string;
  trekSlug: string;
  departureDate: string;
  adults: number;
  children: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city?: string;
  grandTotal: number;
  advancePayment: number;
  remainingAmount: number;
  paymentMethod: string | null;
  couponCode?: string | null;
}

export function buildBookingConfirmationEmailHtml(booking: BookingEmailData): string {
  const participants = `${booking.adults} adult${booking.adults === 1 ? "" : "s"}${
    booking.children > 0 ? `, ${booking.children} child${booking.children === 1 ? "" : "ren"}` : ""
  }`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Booking Confirmation — ${booking.bookingId}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f3;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f3;padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4ebe0;">
          <tr>
            <td style="background:#2D5A27;padding:28px 24px;color:#ffffff;">
              <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">${siteConfig.name}</div>
              <div style="font-size:24px;font-weight:700;margin-top:8px;">Booking Confirmed</div>
              <div style="margin-top:8px;font-size:14px;opacity:0.9;">ID: ${booking.bookingId}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.5;">
                Hi ${booking.customerName}, your trek booking is confirmed. Our team will share join details before departure.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8ece6;border-radius:12px;overflow:hidden;">
                <tr><td style="padding:12px 16px;background:#F7F8F6;font-weight:700;" colspan="2">Booking details</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Trek</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;font-weight:600;">${booking.trekTitle}</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Departure</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;font-weight:600;">${formatDate(booking.departureDate)}</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Participants</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;font-weight:600;">${participants}</td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border:1px solid #e8ece6;border-radius:12px;overflow:hidden;">
                <tr><td style="padding:12px 16px;background:#F7F8F6;font-weight:700;" colspan="2">Payment summary</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Grand total</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;font-weight:600;">${formatCurrency(booking.grandTotal)}</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Advance paid</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;font-weight:600;">${formatCurrency(booking.advancePayment)}</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Remaining</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;font-weight:600;">${formatCurrency(booking.remainingAmount)}</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Method</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;font-weight:600;">${booking.paymentMethod ?? "—"}</td></tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border:1px solid #e8ece6;border-radius:12px;overflow:hidden;">
                <tr><td style="padding:12px 16px;background:#F7F8F6;font-weight:700;" colspan="2">Contact details</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Phone</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;">${booking.customerPhone}</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Email</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;">${booking.customerEmail}</td></tr>
                <tr><td style="padding:10px 16px;border-top:1px solid #e8ece6;">Support</td><td style="padding:10px 16px;border-top:1px solid #e8ece6;text-align:right;">${siteConfig.enquiryEmail ?? siteConfig.email}</td></tr>
              </table>
              <p style="margin:20px 0 0;font-size:13px;color:#666;line-height:1.5;">
                This confirmation was also shared with ${siteConfig.enquiryEmail ?? siteConfig.email}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
