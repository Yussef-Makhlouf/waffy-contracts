import Image from "next/image";
import { brand } from "@/config/brand";
import { approval } from "@/content/site";
import { Button, Eyebrow } from "@/components/ui/elements";
import { NetworkDiagram } from "./NetworkDiagram";

export function NetworksShowcase() {
  return <section className="networks-showcase"><div className="container network-showcase-grid">
    <div className="network-showcase-copy" data-reveal><Eyebrow light english="THE UNSEEN FOUNDATION">الشبكات والبنية التحتية</Eyebrow><h2>قوة لا تُرى.<br /><span>وأثر في كل مكان.</span></h2><p>خلف كل بيئة عمرانية متكاملة، شبكة من التفاصيل المترابطة. اكتشف تصورنا لمجالات الشبكات والأعمال المدنية المساندة.</p><div className="network-tags"><span>المياه والصرف</span><span>التصريف والري</span><span>مسارات الخدمات</span></div><Button href="/services/networks">اكتشف عالم الشبكات</Button><p className="network-approval">مجالات مقترحة، تخضع لاعتماد الشركة.</p></div>
    <div className="network-showcase-visual" data-reveal><Image src={brand.images.engineering} fill alt="تصور تعبيري لأعمال الإنشاء والتخطيط في الموقع" sizes="(min-width: 1024px) 50vw, 100vw" /><div className="network-visual-overlay" /><NetworkDiagram compact /><span className="network-image-label">أساس متين. روابط متكاملة.</span></div>
  </div><span className="sr-only">{approval.imagery}</span></section>;
}
