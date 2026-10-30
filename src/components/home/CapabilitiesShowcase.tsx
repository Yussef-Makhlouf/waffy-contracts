import Image from "next/image";
import { brand } from "@/config/brand";
import { approval } from "@/content/site";
import { Eyebrow, TextLink } from "@/components/ui/elements";

export function CapabilitiesShowcase() {
  return <section className="capabilities" aria-labelledby="capabilities-title"><div className="container capabilities-layout">
    <div className="capabilities-head" data-reveal><Eyebrow english="SPACES WITH PURPOSE">آفاق البناء</Eyebrow><h2 id="capabilities-title">من اتساع الرؤية،<br />إلى أدقّ التفاصيل.</h2><p>نقرأ المكان كوحدة متكاملة؛ مبنى ومحيطًا، بنية وتفصيلًا.</p><TextLink href="/services">استكشف مجالات الأعمال</TextLink></div>
    <figure className="capability capability--wide">
      <div className="capability-frame" data-parallax-host><Image src={brand.crops.skylineDusk} fill alt="مشهد تعبيري لأفق مدينة ورافعات بناء عند الغروب بجوار واجهة حجرية" sizes="(min-width: 1024px) 62vw, 100vw" data-parallax /><span className="curtain" data-curtain aria-hidden="true" /></div>
      <figcaption><span className="index">01</span><span className="capability-title">مدينة تتشكّل</span><span className="capability-text">بيئات عمرانية تُقرأ كمشهد واحد، من الأفق إلى مستوى الشارع.</span><span className="capability-en" lang="en" dir="ltr">BUILT ENVIRONMENTS</span></figcaption>
    </figure>
    <figure className="capability capability--tall">
      <div className="capability-frame emblem-wing"><Image src={brand.crops.lattice} fill alt="تفصيل تعبيري لمشربية حجرية ذهبية في واجهة معمارية" sizes="(min-width: 1024px) 24vw, 50vw" /><span className="curtain" data-curtain aria-hidden="true" /></div>
      <figcaption><span className="index">02</span><span className="capability-title">التفاصيل تصنع الهوية</span><span className="capability-text">خامة، ونسبة، وظل؛ عناصر تمنح الواجهة شخصيتها.</span></figcaption>
    </figure>
    <div className="capabilities-drawing" aria-hidden="true"><svg viewBox="0 0 300 130" fill="none"><path d="M1 125h298M30 125V55l45-25v95M75 125V30l45 25v70M135 125V5l45 25v95M180 125V30l45 25v70M240 125V65l45 25v35M30 55l90 50M135 5l90 50" stroke="currentColor" pathLength={1} vectorEffect="non-scaling-stroke" data-draw /></svg><span lang="en">FORM / MATERIAL / PURPOSE</span></div>
    <p className="image-disclaimer capabilities-disclaimer">{approval.imagery}</p>
  </div></section>;
}
