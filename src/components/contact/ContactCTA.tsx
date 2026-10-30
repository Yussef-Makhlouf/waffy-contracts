import Image from "next/image";
import { brand } from "@/config/brand";
import { contactLinks } from "@/config/contact";
import { Button, EmblemRoofline, Eyebrow } from "@/components/ui/elements";
import { ContactActions } from "./ContactActions";

export function ContactCTA({ network = false }: { network?: boolean }) {
  const available = Boolean(contactLinks.phone || contactLinks.whatsapp || contactLinks.email);
  return <section className="closing" aria-labelledby="closing-title">
    <div className="closing-media emblem-rise"><Image src={brand.crops.cityWorks} alt="" fill sizes="100vw" /><div className="closing-shade" aria-hidden="true" /></div>
    <EmblemRoofline className="closing-roofline" />
    <div className="container closing-layout">
      <div className="closing-head" data-reveal><Eyebrow light english="LET’S BUILD WHAT’S NEXT">طموحك هو نقطة البداية</Eyebrow><h2 id="closing-title">{network ? <>لنبنِ أساسًا<br /><span>لما هو قادم.</span></> : <>لنبدأ بناء<br /><span>مشروعك القادم.</span></>}</h2></div>
      <div className="closing-plate glass" data-reveal>
        <p className="closing-lead">كل مشروع مميز يبدأ بفكرة.<br />وكل فكرة تستحق حوارًا.</p>
        {available ? <ContactActions /> : <p className="closing-pending"><span className="status-dot" aria-hidden="true" />قنوات الاتصال المباشر تُضاف بعد اعتماد بيانات الشركة.</p>}
        <Button href="/contact" variant={available ? "glass" : "gold"}>لنبدأ الحديث</Button>
      </div>
    </div>
  </section>;
}
