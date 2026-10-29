import Image from "next/image";
import { brand } from "@/config/brand";
import { approval } from "@/content/site";
import { ArchitecturalPattern, SectionHeading, TextLink } from "@/components/ui/elements";

export function AboutPreview() {
  return <section id="about" className="section about-section"><div className="container about-grid">
    <div className="about-copy" data-reveal><SectionHeading eyebrow="عن الوافي" english="A NAME. A COMMITMENT." title={<>الوافي…<br />اسم يعكس <span className="serif-accent">الالتزام.</span></>}>البناء أكثر من جدران. هو فكرة تستحق العناية، وتفاصيل تصنع الفرق، وثقة تنمو مع كل خطوة.</SectionHeading><p className="body-copy">في الوافي للمقاولات العامة، نضع الالتزام في صميم هويتنا؛ لنقدّم رؤية ترتبط بطموح المكان، وتحترم متطلبات كل مشروع من البداية.</p><TextLink href="/services">تعرّف على مجالات خدماتنا</TextLink></div>
    <div className="about-visual" data-reveal><div className="about-image"><Image src={brand.images.about} alt="تصوّر تعبيري لمهندس يتأمل مخططات البناء وأفق المدينة" fill sizes="(min-width: 1024px) 46vw, 100vw" /></div><div className="about-stamp"><Image src={brand.logo.icon} width={62} height={62} alt="" /><span>الوعد قيمة.<br />والوفاء <strong>أساس.</strong></span></div><span className="image-index" lang="en" aria-hidden="true">01 / PERSPECTIVE</span><ArchitecturalPattern /><p className="image-disclaimer">{approval.imagery}</p></div>
  </div></section>;
}
