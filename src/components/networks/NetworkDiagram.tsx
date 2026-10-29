export function NetworkDiagram({ compact = false }: { compact?: boolean }) {
  return <figure className={`network-diagram ${compact ? "network-diagram--compact" : ""}`}>
    <svg viewBox="0 0 620 420" role="img" aria-labelledby={compact ? "diagram-preview-title" : "diagram-title"}>
      <title id={compact ? "diagram-preview-title" : "diagram-title"}>رسم تصوّري لترابط شبكات المياه والصرف والكهرباء والاتصالات، لا يمثّل مخططًا هندسيًا تنفيذيًا</title>
      <defs><pattern id={compact ? "diagram-grid-small" : "diagram-grid"} width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="currentColor" strokeOpacity=".12" /></pattern></defs>
      <rect width="620" height="420" fill={`url(#${compact ? "diagram-grid-small" : "diagram-grid"})`} />
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".2"><path d="M70 250 300 110 555 250 325 390Z" /><path d="M70 200 300 60 555 200 325 340Z" /><path d="M70 150 300 10 555 150 325 290Z" /><path d="M70 150v100M300 10v100M555 150v100M325 290v100" /></g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"><path className="network-pipe" d="m90 235 110-65 112 65 112-65 110 65" stroke="#D7B475" /><path d="m125 310 110-65V125l78-45 125 75v145" stroke="#b6ccdc" /><path d="m185 355 140-80 160 90M325 275V155l78-45" stroke="#819f9d" /></g>
      <g fill="#071D37" stroke="#D7B475" strokeWidth="2"><circle cx="90" cy="235" r="7" /><circle cx="200" cy="170" r="7" /><circle cx="312" cy="235" r="10" /><circle cx="424" cy="170" r="7" /><circle cx="534" cy="235" r="7" /></g>
      <g stroke="#D7B475" strokeWidth="1" fill="none"><path d="M278 193v-64l35-20 35 20v64l-35 20Z" /><path d="m278 129 35 20 35-20M313 149v64M290 137v48M302 144v48M326 143v48M338 137v48" /><circle cx="312" cy="235" r="26" opacity=".35" /></g>
      <g fill="#D7B475" fontFamily="sans-serif" fontSize="10" letterSpacing="2"><text x="30" y="390">CONNECTED BY DESIGN</text><text x="470" y="38">NETWORK / 01</text></g>
    </svg>
    {!compact && <figcaption>ترابط يصنع التكامل <span>رسم مفاهيمي توضيحي</span></figcaption>}
  </figure>;
}
