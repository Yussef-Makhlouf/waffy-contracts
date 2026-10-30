import Image from "next/image";
import { brand } from "@/config/brand";
import { approval } from "@/content/site";
import { Button, Eyebrow } from "@/components/ui/elements";
import { NetworkDiagram } from "./NetworkDiagram";
import { NetworkCapabilities } from "./NetworkCapabilities";

export function NetworksShowcase() {
  return <section className="networks" aria-labelledby="networks-title">
    <svg className="networks-paths" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <path d="M-20 690H300l90-90h330l60 60h700" pathLength={1} stroke="currentColor" vectorEffect="non-scaling-stroke" data-draw />
      <path d="M1460 96H1200l-60 60H900V-20" pathLength={1} stroke="currentColor" strokeOpacity=".55" vectorEffect="non-scaling-stroke" data-draw />
      <path d="M560 920V780l60-60h240" pathLength={1} stroke="currentColor" strokeOpacity=".4" vectorEffect="non-scaling-stroke" data-draw />
      <g fill="#071D37" stroke="currentColor"><circle cx="390" cy="600" r="4" /><circle cx="720" cy="600" r="4" /><circle cx="1140" cy="156" r="4" /><circle cx="620" cy="720" r="4" /></g>
    </svg>
    <div className="container networks-layout">
      <div className="networks-copy" data-reveal>
        <Eyebrow light english="THE UNSEEN FOUNDATION">الشبكات والبنية التحتية</Eyebrow>
        <h2 id="networks-title">قوة لا تُرى.<br /><span>وأثر في كل مكان.</span></h2>
        <p>خلف كل بيئة عمرانية متكاملة، شبكة من التفاصيل المترابطة. اكتشف تصورنا لمجالات الشبكات والأعمال المدنية المساندة.</p>
        <NetworkCapabilities compact />
        <Button href="/services/networks">اكتشف عالم الشبكات</Button>
        <p className="networks-note">مجالات مقترحة، تخضع لاعتماد الشركة.</p>
      </div>
      <figure className="networks-visual">
        <div className="networks-photo emblem-wing"><Image src={brand.crops.sitePlans} fill alt="تصور تعبيري لمهندس يراجع المخططات أمام مبانٍ قيد الإنشاء" sizes="(min-width: 1024px) 44vw, 100vw" /><span className="curtain curtain--navy" data-curtain aria-hidden="true" /></div>
        <span className="networks-registration" aria-hidden="true" />
        <div className="networks-plate glass"><NetworkDiagram compact /></div>
        <figcaption>أساس متين. روابط متكاملة.<span className="sr-only"> {approval.imagery}</span></figcaption>
      </figure>
    </div>
  </section>;
}
