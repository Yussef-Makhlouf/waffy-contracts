import { ArrowUpLeft, Mail, MapPin, Phone } from "lucide-react";
import { contact, contactLinks } from "@/config/contact";
import { WhatsAppIcon } from "@/components/layout/FloatingContactActions";

export function ContactActions({ cards = false }: { cards?: boolean }) {
  const hasContacts = Boolean(contactLinks.phone || contactLinks.whatsapp || contactLinks.email);
  if (!hasContacts) return <div className={`contact-pending ${cards ? "contact-pending--large" : ""}`}><span className="status-dot" aria-hidden="true" /><div><h2>قنوات التواصل قيد الإعداد</h2><p>ستُتاح أرقام الاتصال وواتساب هنا بعد اعتماد بيانات التواصل الرسمية من الشركة.</p></div></div>;
  return <div className={cards ? "contact-card-grid" : "contact-inline-actions"}>
    {contactLinks.whatsapp && <a className={cards ? "contact-card" : "button button--gold"} href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span><strong>تواصل عبر واتساب</strong>{cards && <small>لنبدأ الحديث عن فكرتك</small>}</span><ArrowUpLeft size={20} aria-hidden="true" /></a>}
    {contactLinks.phone && <a className={cards ? "contact-card" : "button button--outline"} href={contactLinks.phone}><Phone size={25} aria-hidden="true" /><span><strong>اتصال مباشر</strong>{cards && <small dir="ltr">{contact.phone}</small>}</span><ArrowUpLeft size={20} aria-hidden="true" /></a>}
    {contactLinks.email && <a className={cards ? "contact-card" : "button button--outline"} href={contactLinks.email}><Mail size={25} aria-hidden="true" /><span><strong>البريد الإلكتروني</strong>{cards && <small>{contact.email}</small>}</span><ArrowUpLeft size={20} aria-hidden="true" /></a>}
  </div>;
}

export function SocialLinks() {
  if (!contact.socialLinks.length) return null;
  return <div className="social-links" aria-label="حساباتنا الرسمية">{contact.socialLinks.map(s => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}<ArrowUpLeft size={18} aria-hidden="true" /></a>)}</div>;
}

export function CompanyLocation() {
  if (!contact.address) return null;
  return <div className="company-location"><MapPin aria-hidden="true" /><div><h2>موقع الشركة</h2><p>{contact.address}</p>{contact.mapUrl && <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer">عرض الموقع على الخريطة</a>}</div></div>;
}
