import Image from "next/image";
import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { services, serviceGroups } from "@/content/services";
import { brand } from "@/config/brand";
import { Eyebrow, ServiceIconView } from "@/components/ui/elements";

export function ServiceDetailSection({ group }: { group: typeof serviceGroups[number] }) {
  const items = services.filter(s => s.group === group.id);
  return <section className={`service-detail-group section service-detail-group--${group.id}`} aria-labelledby={`group-${group.id}`}><div className="container service-editorial-grid"><div className="service-editorial-intro" data-reveal><Eyebrow english={group.english}>مجالات مقترحة</Eyebrow><h2 id={`group-${group.id}`}>{group.title}</h2><p>{group.intro}</p><div className="service-editorial-image"><Image src={brand.images[group.image]} alt={`تصور معماري تعبيري يستلهم ${group.title}`} fill sizes="(min-width: 1024px) 35vw, 100vw" /></div><span className="image-disclaimer">صورة تعبيرية، وليست مشروعًا منفّذًا للشركة.</span></div><div className="service-details">{items.map(service => <article id={service.id} className="service-detail" key={service.id} data-reveal><div className="service-detail-heading"><ServiceIconView name={service.icon} size={30} /><h3>{service.title}</h3><span className="index" aria-hidden="true">{service.number}</span></div><p>{service.description}</p><div className="service-detail-bottom"><span>{service.focus}</span><Link href="/contact" aria-label={`ناقش متطلبات ${service.title}`}>ناقش متطلباتك<ArrowUpLeft size={17} aria-hidden="true" /></Link></div>{service.id === "water-sewage" && <Link className="network-detail-link" href="/services/networks">استكشف صفحة الشبكات المتخصصة<ArrowUpLeft size={17} aria-hidden="true" /></Link>}</article>)}</div></div></section>;
}
