import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, TextLink } from "@/components/ui/elements";
import { ContactActions, SocialLinks, CompanyLocation } from "@/components/contact/ContactActions";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("تواصل معنا", "ابدأ الحديث عن مشروعك مع الوافي للمقاولات العامة. قنوات اتصال مباشرة وواتساب تُتاح بعد اعتماد بيانات الشركة.", "/contact");
export default function ContactPage() {
  return <><PageHero title="مشروعك يبدأ بفكرة." accent="لنتحدث عنها." eyebrow="تواصل معنا" english="A CONVERSATION THAT BUILDS" description="سواء كانت رؤيتك واضحة، أو ما زالت في بدايتها، الخطوة الأولى هي الحوار." image={brand.images.architecture} /><section className="section contact-section"><div className="container contact-layout"><div data-reveal><Eyebrow english="DIRECT & PERSONAL">تواصل مباشر</Eyebrow><h2>أقرب إلى فكرتك.<br /><span>من أول حديث.</span></h2><p>شاركنا طبيعة المشروع وما تطمح إليه. معرفة الموقع ونوع الأعمال والمرحلة الحالية تساعد على بدء حوار أكثر وضوحًا.</p><TextLink href="/services">تعرّف على مجالات الخدمات</TextLink></div><div className="contact-details" data-reveal><ContactActions cards /><CompanyLocation /><SocialLinks /><div className="contact-signature"><span>{brand.tagline}</span><span lang="en" dir="ltr">YOUR VISION. OUR CONVERSATION.</span></div></div></div></section></>;
}
