import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { brand } from "@/config/brand";
import { contact, contactLinks } from "@/config/contact";
import { navigation } from "@/content/site";
import { services } from "@/content/services";
import { SocialLinks } from "@/components/contact/SocialLinks";

export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <div className="footer-brand"><Link href="/" aria-label="العودة إلى الرئيسية"><Image src={brand.logo.dark} alt={brand.name} width={172} height={138} /></Link><p>في كل فكرة بناء، فرصة لصناعة أثر.<br />وفي كل خطوة، قيمة اسمها الوفاء.</p></div>
      <div className="footer-column"><h2>اكتشف الوافي</h2>{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
      <div className="footer-column"><h2>مجالات الخدمات</h2>{services.filter(s => ["general-contracting", "infrastructure", "architectural-finishing", "water-sewage"].includes(s.id)).map(service => <Link key={service.id} href={`/services#${service.id}`}>{service.title}</Link>)}</div>
      <div className="footer-column footer-contact"><h2>لنفتح آفاقًا جديدة</h2><p>الخطوة الأولى في مشروعك تبدأ بحوار.</p><Link className="footer-contact-link" href="/contact">تواصل معنا<ArrowUpLeft size={21} aria-hidden="true" /></Link>{contactLinks.phone && <a href={contactLinks.phone} dir="ltr">{contact.phone}</a>}{contactLinks.email && <a href={contactLinks.email}>{contact.email}</a>}</div>
    </div>
    <div className="grid items-center gap-5 border-t border-white/10 py-7 md:grid-cols-[1fr_auto]"><div><h2 className="text-sm text-[#e9ddc7]">الوافي على منصات التواصل</h2><span lang="en" dir="ltr" className="mt-2 inline-block text-[9px] tracking-[.16em] text-[#b7a482]">STAY CONNECTED</span></div><SocialLinks compact /></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {brand.name}. جميع الحقوق محفوظة.</span><span lang="en" dir="ltr">BUILT ON COMMITMENT.</span><a href="#main-content">العودة للأعلى ↑</a></div>
  </div></footer>;
}
