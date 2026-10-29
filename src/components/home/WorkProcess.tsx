import { approval, workSteps } from "@/content/site";
import { SectionHeading } from "@/components/ui/elements";

export function WorkProcess({ network = false }: { network?: boolean }) {
  return <section className="section process-section"><div className="container"><SectionHeading eyebrow={network ? "رحلة أعمال الشبكات" : "من الفكرة إلى الأثر"} english="A CONSIDERED APPROACH" title={<>خطوات واضحة.<br className="mobile-break" /> وجهة واحدة.</>}><span>{network ? "تصوّر لمراحل تنسيق الشبكات، من فهم الموقع حتى مراجعة متطلبات التسليم." : "كل مرحلة تُمهّد لما بعدها، وكل تفصيل يقرب الرؤية من الواقع."}</span></SectionHeading><ol className="process-grid" data-reveal>{workSteps.map((step, i) => <li key={step.title}><span className="process-number" aria-hidden="true">0{i + 1}</span><div className="process-marker" aria-hidden="true" /><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol><p className="approval-note">{approval.process}</p></div></section>;
}
