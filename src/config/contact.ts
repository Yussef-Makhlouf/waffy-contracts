export interface ContactConfig {
  phone: string | null;
  whatsapp: string | null;
  whatsappMessage: string;
  email: string | null;
  address: string | null;
  mapUrl: string | null;
  socialLinks: { label: string; url: string }[];
}

// Add business-approved values only. Numbers must use international E.164 format.
export const contact: ContactConfig = {
  phone: null,
  whatsapp: null,
  whatsappMessage: "السلام عليكم، أرغب في التواصل مع الوافي بخصوص مشروع.",
  email: null,
  address: null,
  mapUrl: null,
  socialLinks: [],
};

export function phoneHref(number: string | null): string | null {
  return number && /^\+[1-9]\d{7,14}$/.test(number) ? `tel:${number}` : null;
}

export function whatsappHref(number: string | null, message = ""): string | null {
  if (!number || !/^\+[1-9]\d{7,14}$/.test(number)) return null;
  return `https://wa.me/${number.slice(1)}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export const contactLinks = {
  phone: phoneHref(contact.phone),
  whatsapp: whatsappHref(contact.whatsapp, contact.whatsappMessage),
  email: contact.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) ? `mailto:${contact.email}` : null,
};
