import Image from "next/image";
import { brand } from "@/config/brand";
import { approval, values } from "@/content/site";
import { EmblemBeam, Eyebrow, TextLink } from "@/components/ui/elements";

export function AboutPreview() {
  return <section id="about" className="about" aria-labelledby="about-title"><div className="container about-layout">
    <div className="about-heading" data-reveal><Eyebrow english="A NAME. A COMMITMENT.">عن الوافي</Eyebrow><h2 id="about-title">الوافي…<br />اسم يعكس <span>الالتزام.</span></h2></div>
    <figure className="about-figure">
      <div className="about-frame emblem-wing" data-parallax-host><Image src={brand.crops.engineerView} alt="تصوّر تعبيري لمهندس يحمل المخططات ويتأمل أفق المدينة وأعمال البناء" fill sizes="(min-width: 1024px) 58vw, 100vw" data-parallax /><span className="curtain" data-curtain aria-hidden="true" /></div>
      <figcaption className="image-disclaimer">{approval.imagery}</figcaption>
    </figure>
    <div className="about-text" data-reveal>
      <p className="about-lead">البناء أكثر من جدران. هو فكرة تستحق العناية، وتفاصيل تصنع الفرق، وثقة تنمو مع كل خطوة.</p>
      <p>في الوافي للمقاولات العامة، نضع الالتزام في صميم هويتنا؛ لنقدّم رؤية ترتبط بطموح المكان، وتحترم متطلبات كل مشروع من البداية.</p>
      <TextLink href="/services">تعرّف على مجالات خدماتنا</TextLink>
    </div>
    <div className="about-panel glass" data-reveal>
      <div className="about-panel-top"><Image src={brand.logo.icon} width={52} height={43} alt="" /><p>الوعد قيمة.<br />والوفاء <strong>أساس.</strong></p></div>
      <h3 className="about-panel-title">ما نؤمن به <span lang="en" dir="ltr">OUR GUIDING VALUES</span></h3>
      <ol className="about-values">{values.map((value, i) => <li key={value.english}><span className="index" aria-hidden="true">0{i + 1}</span><strong>{value.title}</strong><span>{value.text}</span></li>)}</ol>
    </div>
    <EmblemBeam className="about-beam" />
  </div></section>;
}
