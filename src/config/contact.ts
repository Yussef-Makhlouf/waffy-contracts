export type SocialPlatform = "instagram" | "x" | "linkedin" | "facebook";
export interface SocialProfile { platform: SocialPlatform; label: string; url: string | null; }

export interface ContactConfig {
  phone: string | null;
  whatsapp: string | null;
  whatsappMessage: string;
  email: string | null;
  address: string | null;
  mapUrl: string | null;
  socialLinks: SocialProfile[];
}

// Add business-approved values only. Numbers must use international E.164 format.
export const contact: ContactConfig = {
  phone: "+966592772128",
  whatsapp: "+966560760092",
  whatsappMessage: "السلام عليكم، أرغب في التواصل مع الوافي بخصوص مشروع.",
  email: "info@alwafigc.sa",
  address: null,
  mapUrl: null,
  socialLinks: [
    { platform: "instagram", label: "إنستغرام", url: null },
    { platform: "x", label: "إكس", url: null },
    { platform: "linkedin", label: "لينكدإن", url: null },
    { platform: "facebook", label: "فيسبوك", url: null },
  ],
};

export function phoneHref(number: string | null): string | null {
  return number && /^\+[1-9]\d{7,14}$/.test(number) ? `tel:${number}` : null;
}

export function whatsappHref(number: string | null, message = ""): string | null {
  if (!number || !/^\+[1-9]\d{7,14}$/.test(number)) return null;
  return `https://wa.me/${number.slice(1)}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function socialHref(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export const contactLinks = {
  phone: phoneHref(contact.phone),
  whatsapp: whatsappHref(contact.whatsapp, contact.whatsappMessage),
  email: contact.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) ? `mailto:${contact.email}` : null,
};
