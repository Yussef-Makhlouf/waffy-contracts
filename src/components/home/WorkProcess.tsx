import { approval, workSteps } from "@/content/site";
import { SectionHeading } from "@/components/ui/elements";

export function WorkProcess({ network = false }: { network?: boolean }) {
  return <section className="process" aria-label={network ? "رحلة أعمال الشبكات" : "من الفكرة إلى الأثر"}><div className="container">
    <div className="process-head" data-reveal><SectionHeading eyebrow={network ? "رحلة أعمال الشبكات" : "من الفكرة إلى الأثر"} english="A CONSIDERED APPROACH" title={<>خطوات واضحة.<br />وجهة واحدة.</>}><span>{network ? "تصوّر لمراحل تنسيق الشبكات، من فهم الموقع حتى مراجعة متطلبات التسليم." : "كل مرحلة تُمهّد لما بعدها، وكل تفصيل يقرب الرؤية من الواقع."}</span></SectionHeading></div>
    <ol className="process-steps" data-reveal>{workSteps.map((step, i) => <li key={step.title} style={{ "--step": i } as React.CSSProperties}>
      <span className="process-tread" aria-hidden="true" data-rule="x" />{i > 0 && <span className="process-riser" aria-hidden="true" data-rule="y" />}<span className="process-node" aria-hidden="true" />
      <span className="process-index" aria-hidden="true">0{i + 1}</span><span className="process-stage" lang="en" aria-hidden="true">STAGE {i + 1} / {workSteps.length}</span>
      <h3>{step.title}</h3><p>{step.text}</p>
    </li>)}</ol>
    <div className="process-ruler" aria-hidden="true"><span lang="en">CONSTRUCTION SEQUENCE</span></div>
    <p className="approval-note">{approval.process}</p>
  </div></section>;
}
