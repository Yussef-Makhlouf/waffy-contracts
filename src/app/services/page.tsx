import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { PageHero } from "@/components/ui/PageHero";
import { services, serviceGroups } from "@/content/services";
import { approval } from "@/content/site";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { NetworksShowcase } from "@/components/networks/NetworksShowcase";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { NetworkITServicesSection } from "@/components/networks/NetworkITSections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("خدماتنا", "تعرّف إلى مجالات خدمات الوافي المقترحة في المقاولات والبناء والبنية التحتية والتشطيبات، وناقش نطاق مشروعك.", "/services");
export default function ServicesPage() {
  return <>
    <PageHero title="لكل طموح،" accent="مساحة نبنيها." eyebrow="خدماتنا" english="OUR SCOPE OF WORK" description="من البناء إلى تفاصيل التشطيب، مجالات تجمعها رؤية متكاملة للمكان." />
    <div className="container services-directory">
      <p className="approval-note">{approval.services}</p>
      <nav className="service-anchor-nav" aria-label="انتقل إلى مجال الخدمة">{services.map(service => <Link key={service.id} href={`#${service.id}`}><span className="index" aria-hidden="true">{service.number}</span>{service.title}</Link>)}</nav>
      <Link href="#network-it" aria-label="انتقل إلى قسم الشبكات وتقنية المعلومات" className="mt-5 flex min-h-14 items-center justify-between gap-5 border-b border-[#071d37]/25 py-3 text-sm"><span>الشبكات وتقنية المعلومات <span lang="en" dir="ltr" className="ms-4 text-[9px] tracking-[.15em] text-[#765a31]">NETWORKS & IT</span></span><ArrowLeftIcon width={20} height={20} aria-hidden="true" /></Link>
    </div>
    {serviceGroups.map(group => <ServiceDetailSection group={group} key={group.id} />)}
    <NetworkITServicesSection />
    <NetworksShowcase />
    <ContactCTA />
  </>;
}
