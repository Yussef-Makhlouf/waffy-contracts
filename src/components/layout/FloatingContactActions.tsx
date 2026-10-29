import { Phone } from "lucide-react";
import { contactLinks } from "@/config/contact";

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 1.7 17.8L0 24l6.4-1.7A11.9 11.9 0 0 0 24 11.8c0-3.1-1.2-6.1-3.5-8.3ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4A9.9 9.9 0 1 1 12 21.8Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-.9 1c-.2.2-.4.2-.7.1a8.1 8.1 0 0 1-4-3.5c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6L9 6.8c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5 0-.8.4-.2.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.7.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" /></svg>;
}
export function FloatingContactActions() {
  if (!contactLinks.phone && !contactLinks.whatsapp) return null;
  return <aside className="floating-actions" aria-label="تواصل مباشر">{contactLinks.whatsapp && <a className="floating-action whatsapp" href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="التواصل عبر واتساب"><WhatsAppIcon /></a>}{contactLinks.phone && <a className="floating-action" href={contactLinks.phone} aria-label="اتصال مباشر بالوافي"><Phone size={22} /></a>}</aside>;
}
