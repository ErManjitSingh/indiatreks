import { siteConfig } from "@/config/site";

export interface EnquiryEmailPayload {
  subject: string;
  type: "booking" | "enquiry" | "callback" | "exit-offer" | "payment";
  fields: Record<string, string | number | boolean | null | undefined>;
  html?: string;
}

const ENQUIRY_EMAIL =
  siteConfig.enquiryEmail ?? "indiaholidaydestinations.in@gmail.com";

function formatFields(fields: EnquiryEmailPayload["fields"]): string {
  return Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join("\n");
}

/** Delivers enquiry/booking notifications to indiaholidaydestinations.in@gmail.com */
export async function sendBrandEmail(
  payload: EnquiryEmailPayload,
): Promise<{ ok: boolean; message: string }> {
  const text = formatFields(payload.fields);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${ENQUIRY_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `[IHD Treks] ${payload.subject}`,
        _template: "table",
        _captcha: "false",
        type: payload.type,
        brand: siteConfig.name,
        ...payload.fields,
        message: text,
        html: payload.html,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, message: "Unable to deliver enquiry email right now." };
    }

    return { ok: true, message: "Enquiry delivered" };
  } catch {
    return {
      ok: false,
      message: `Could not reach mail service. Please email ${ENQUIRY_EMAIL} directly.`,
    };
  }
}

export { ENQUIRY_EMAIL };
