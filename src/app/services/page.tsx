import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { services, serviceGroups } from "@/content/services";
import { approval } from "@/content/site";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { NetworksShowcase } from "@/components/networks/NetworksShowcase";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("خدماتنا", "تعرّف إلى مجالات خدمات الوافي المقترحة في المقاولات والبناء والبنية التحتية والتشطيبات، وناقش نطاق مشروعك.", "/services");
export default function ServicesPage() {
  return <><PageHero title="لكل طموح،" accent="مساحة نبنيها." eyebrow="خدماتنا" english="OUR SCOPE OF WORK" description="من البناء إلى تفاصيل التشطيب، مجالات تجمعها رؤية متكاملة للمكان." /><div className="container services-directory"><p className="approval-note">{approval.services}</p><nav className="service-anchor-nav" aria-label="انتقل إلى مجال الخدمة">{services.map(service => <Link key={service.id} href={`#${service.id}`}><span className="index" aria-hidden="true">{service.number}</span>{service.title}</Link>)}</nav></div>{serviceGroups.map(group => <ServiceDetailSection group={group} key={group.id} />)}<NetworksShowcase /><ContactCTA /></>;
}
