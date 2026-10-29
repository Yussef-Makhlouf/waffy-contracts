import { services } from "@/content/services";
import { approval } from "@/content/site";
import { SectionHeading, TextLink } from "@/components/ui/elements";
import { ServiceCard } from "@/components/services/ServiceCard";

export function ServicesOverview() {
  return <section className="section services-overview" id="services"><div className="container"><div className="section-top" data-reveal><SectionHeading eyebrow="مجالات خدماتنا" english="EXPERTISE IN EVERY DETAIL" title={<>رؤية متكاملة.<br className="mobile-break" /> تفاصيل تصنع الفرق.</>} /><TextLink href="/services">جميع الخدمات</TextLink></div><div className="services-grid" data-reveal>{services.map(service => <ServiceCard key={service.id} service={service} />)}</div><p className="approval-note"><span aria-hidden="true">※</span>{approval.services}</p></div></section>;
}
