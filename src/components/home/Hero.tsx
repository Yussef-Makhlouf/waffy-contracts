import { getImageProps } from "next/image";
import { brand } from "@/config/brand";
import { searchPages } from "@/content/search";
import { Button, EmblemHorizon, Eyebrow } from "@/components/ui/elements";

export function Hero() {
  // Separate crops for portrait and landscape screens; only the matching one is downloaded.
  const common = { alt: "تصوّر معماري تعبيري لواجهة حجرية بمشربيات ذهبية وأفق مدينة عند الغروب", fill: true, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const { props: { srcSet: landscape } } = getImageProps({ ...common, src: brand.images.hero, quality: 85 });
  const { props: { srcSet: portrait, ...image } } = getImageProps({ ...common, src: brand.crops.heroPortrait, quality: 85 });

  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-media">
      <picture>
        <source media="(min-width: 768px)" srcSet={landscape} sizes="100vw" />
        <img {...image} alt={common.alt} srcSet={portrait} className="hero-image" data-hero-image />
      </picture>
      <div className="hero-shade" aria-hidden="true" />
    </div>
    <EmblemHorizon side="below" className="hero-horizon" />
    <div className="container hero-stage">
      <span className="hero-plumb" aria-hidden="true" data-rule="y" />
      <div className="hero-copy">
        <div data-hero-reveal><Eyebrow light english="ALWAFI GENERAL CONTRACTING">الوافي للمقاولات العامة</Eyebrow></div>
        <h1 id="hero-title" data-hero-reveal>نبني الثقة…<br /><span>ونترك الأثر.</span></h1>
        <p data-hero-reveal>{searchPages["/"].summary}</p>
        <div className="hero-actions" data-hero-reveal><Button href="/services">اكتشف خدماتنا</Button><Button href="/contact" variant="glass">تواصل معنا</Button></div>
      </div>
      <div className="hero-plate glass" data-hero-reveal>
        <span className="hero-plate-label" lang="en" dir="ltr">A VISION TAKING SHAPE</span>
        <p className="hero-plate-title">مساحة للطموح.</p>
        <ul className="hero-disciplines" aria-label="مجالات الأعمال"><li>بناء وتشييد</li><li>بنية تحتية</li><li>أعمال معمارية</li></ul>
        <p className="hero-plate-tagline">{brand.tagline}</p>
      </div>
      <span className="hero-side-note" aria-hidden="true" lang="en">VISION INTO STRUCTURE</span>
    </div>
  </section>;
}
