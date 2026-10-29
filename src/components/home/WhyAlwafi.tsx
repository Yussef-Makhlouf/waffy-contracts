import { values } from "@/content/site";
import { ArchitecturalPattern, Eyebrow } from "@/components/ui/elements";

export function WhyAlwafi() {
  return <section className="values-section"><div className="container values-layout"><div className="values-heading" data-reveal><Eyebrow english="OUR GUIDING VALUES">ما نؤمن به</Eyebrow><h2>نبني على<br /><span>قيمٍ راسخة.</span></h2><p>قيم نضعها في صميم رؤيتنا، لتبقى هوية الوافي حاضرة في كل تفصيل.</p><ArchitecturalPattern /></div><div className="values-list" data-reveal>{values.map((value, i) => <article className="value-row" key={value.english}><span className="index">0{i + 1}</span><div><h3>{value.title}</h3><p>{value.text}</p></div><span lang="en" className="value-english">{value.english}</span></article>)}</div></div></section>;
}
