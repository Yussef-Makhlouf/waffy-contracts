import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { brand } from "@/config/brand";
import { services, serviceGroups } from "@/content/services";
import { approval } from "@/content/site";
import { SectionHeading, ServiceIconView, TextLink } from "@/components/ui/elements";

const featuredId = "general-contracting";

export function ServicesOverview() {
  const featured = services.find(s => s.id === featuredId)!;
  return <section className="services" id="services" aria-labelledby="services-title"><div className="container">
    <div className="services-head" data-reveal><SectionHeading eyebrow="مجالات خدماتنا" english="EXPERTISE IN EVERY DETAIL" title={<span id="services-title">رؤية متكاملة.<br />تفاصيل تصنع الفرق.</span>} /><div className="services-head-side"><p>عشرة مجالات مقترحة، في ثلاثة فصول: البناء والتنفيذ، البنية التحتية والأنظمة، والعمارة وتفاصيل المكان.</p><TextLink href="/services">جميع الخدمات</TextLink></div></div>
    <div className="services-layout">
      <Link className="services-feature" href={`/services#${featured.id}`}>
        <span className="services-feature-media"><Image src={brand.crops.sitePanorama} alt="" fill sizes="(min-width: 1024px) 42vw, 100vw" /><span className="curtain" data-curtain aria-hidden="true" /></span>
        <span className="services-feature-mark" lang="en" dir="ltr" aria-hidden="true">FROM VISION<br />TO STRUCTURE.</span>
        <span className="services-feature-plate glass"><span className="services-feature-top"><ServiceIconView name={featured.icon} size={26} /><span className="index" aria-hidden="true">{featured.number}</span></span><strong>{featured.title}</strong><span className="services-feature-short">{featured.short}</span><span className="services-feature-link">اكتشف المجال<ArrowUpLeft size={18} strokeWidth={1.5} aria-hidden="true" /></span></span>
      </Link>
      <div className="services-index">{serviceGroups.map(group => {
        const items = services.filter(s => s.group === group.id && s.id !== featuredId);
        return <div className="services-group" key={group.id} data-reveal>
          <h3 className="services-group-title"><span>{group.title}</span><span lang="en" dir="ltr">{group.english}</span></h3>
          <ul>{items.map(service => <li key={service.id}><Link className="service-row" href={`/services#${service.id}`}><span className="index" aria-hidden="true">{service.number}</span><span className="service-row-title">{service.title}</span><span className="service-row-short">{service.short}</span><ArrowUpLeft className="service-row-arrow" size={20} strokeWidth={1.5} aria-hidden="true" /></Link></li>)}</ul>
        </div>;
      })}</div>
    </div>
    <p className="approval-note"><span aria-hidden="true">※</span>{approval.services}</p>
  </div></section>;
}
