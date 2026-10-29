import Image from "next/image";
import { ArrowDown, CornerDownLeft } from "lucide-react";
import { brand } from "@/config/brand";
import { Button, Eyebrow } from "@/components/ui/elements";

export function Hero() {
  return <section className="home-hero" aria-labelledby="hero-title">
    <Image className="hero-background" src={brand.images.hero} alt="تصوّر معماري تعبيري لواجهات حجرية وزجاجية وأفق مدينة عند الغروب" fill sizes="100vw" preload quality={85} />
    <div className="hero-overlay" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" />
    <div className="container hero-content">
      <div className="hero-viewfinder" aria-hidden="true"><span className="viewfinder-label" lang="en" dir="ltr">ALWAFI / ARCHITECTURAL PERSPECTIVE</span><svg viewBox="0 0 480 340" fill="none"><path d="M1 70V1h70M409 1h70v70M479 269v70h-70M71 339H1v-70" stroke="currentColor" /><path d="M1 275 195 82l190 191M50 340 242 147l191 192M106 340l137-138 137 138" stroke="currentColor" strokeOpacity=".22" /><path d="M195 82V25l48-24v146M243 45l49 25v127" stroke="currentColor" strokeOpacity=".5" /><path d="M225 170h34M242 154v34" stroke="currentColor" strokeOpacity=".6" /></svg><div className="viewfinder-caption"><span>مساحة للطموح.</span><span lang="en" dir="ltr">A VISION TAKING SHAPE.</span></div></div>
      <div className="hero-copy">
        <div data-hero-reveal><Eyebrow light english="ALWAFI GENERAL CONTRACTING">الوافي للمقاولات العامة</Eyebrow></div>
        <h1 id="hero-title" data-hero-reveal>نبني الثقة<span className="hero-ellipsis">...</span><br /><span>ونترك الأثر.</span></h1>
        <p data-hero-reveal>من طموح الفكرة إلى تفاصيل المكان.<br />رؤية معمارية، وقيمة راسخة عنوانها الالتزام.</p>
        <div className="hero-actions" data-hero-reveal><Button href="/services">اكتشف خدماتنا</Button><Button href="/contact" variant="outline">تواصل معنا</Button></div>
      </div>
      <a href="#about" className="hero-scroll" aria-label="اكتشف المزيد عن الوافي"><span>اكتشف الوافي</span><ArrowDown size={19} aria-hidden="true" /></a>
      <div className="hero-side-note" aria-hidden="true" lang="en">VISION INTO STRUCTURE — ALWAFI</div>
      <div className="hero-bottom" data-hero-reveal><div className="hero-signature"><CornerDownLeft size={24} aria-hidden="true" /><span>{brand.tagline}</span></div><div className="hero-disciplines"><span>بناء وتشييد</span><span>بنية تحتية</span><span>أعمال معمارية</span></div><span className="hero-coordinate" lang="en" aria-hidden="true">EST. ON COMMITMENT</span></div>
    </div>
  </section>;
}
