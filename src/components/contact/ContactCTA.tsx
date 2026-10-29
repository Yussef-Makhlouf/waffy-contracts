import Image from "next/image";
import { brand } from "@/config/brand";
import { contactLinks } from "@/config/contact";
import { Button, Eyebrow } from "@/components/ui/elements";
import { ContactActions } from "./ContactActions";

export function ContactCTA({ network = false }: { network?: boolean }) {
  const available = Boolean(contactLinks.phone || contactLinks.whatsapp || contactLinks.email);
  return <section className="contact-cta"><Image src={brand.images.architecture} alt="" fill sizes="100vw" /><div className="contact-cta-overlay" /><div className="container contact-cta-content" data-reveal><div><Eyebrow light english="LET’S BUILD WHAT’S NEXT">طموحك هو نقطة البداية</Eyebrow><h2>{network ? <>لنبنِ أساسًا<br />لما هو قادم.</> : <>لنبدأ بناء<br /><span>مشروعك القادم.</span></>}</h2></div><div className="contact-cta-actions"><p>كل مشروع مميز يبدأ بفكرة.<br />وكل فكرة تستحق حوارًا.</p>{available && <ContactActions />}<Button href="/contact" variant={available ? "outline" : "gold"}>لنبدأ الحديث</Button></div></div></section>;
}
