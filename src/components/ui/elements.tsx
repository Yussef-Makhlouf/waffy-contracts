import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Building2, Building, Cable, Droplets, HardHat, Layers3, Milestone, Paintbrush, Ruler, Trees, UtilityPole, type LucideIcon } from "lucide-react";
import type { ServiceIcon } from "@/content/services";

const icons: Record<ServiceIcon, LucideIcon> = {
  building: Building2, city: Building, infrastructure: UtilityPole, water: Droplets,
  electrical: Cable, roads: Milestone, finishing: Paintbrush, restoration: Layers3,
  landscape: Trees, management: HardHat,
};
export function ServiceIconView({ name, size = 28 }: { name: ServiceIcon; size?: number }) {
  const Icon = icons[name] || Ruler;
  return <Icon size={size} strokeWidth={1.35} aria-hidden="true" />;
}
export function Button({ href, children, variant = "gold", className = "" }: { href: string; children: React.ReactNode; variant?: "gold" | "outline" | "navy" | "glass"; className?: string }) {
  return <Link href={href} className={`button button--${variant} ${className}`}><span>{children}</span><ArrowLeft size={18} aria-hidden="true" /></Link>;
}
export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link className={`text-link ${light ? "text-link--light" : ""}`} href={href}>{children}<ArrowUpLeft size={19} aria-hidden="true" /></Link>;
}
export function Eyebrow({ children, english, light = false }: { children: React.ReactNode; english?: string; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow--light" : ""}`}><span className="eyebrow-line" aria-hidden="true" /><span>{children}</span>{english && <span className="eyebrow-english" lang="en" dir="ltr">{english}</span>}</div>;
}
export function SectionHeading({ eyebrow, english, title, children, light = false }: { eyebrow: string; english: string; title: React.ReactNode; children?: React.ReactNode; light?: boolean }) {
  return <div className={`section-heading ${light ? "section-heading--light" : ""}`}><Eyebrow english={english} light={light}>{eyebrow}</Eyebrow><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
// The emblem's stepped crown, simplified to its wings: [x, rise] as fractions of
// a band whose height is the CSS --peak. Each wing climbs, then steps up.
const crown: [number, number][] = [[0, .14], [.1, .28], [.1, .4], [.2, .54], [.2, .66], [.31, .8], [.31, .9], [.47, 1], [.53, 1], [.69, .9], [.69, .8], [.8, .66], [.8, .54], [.9, .4], [.9, .28], [1, .14]];
const W = 1440, H = 120;
const profile = (base: number, shift = 0) => crown.map(([x, rise], i) => `${i ? "L" : "M"}${(Math.min(1, Math.max(0, x + shift)) * W).toFixed(1)} ${((1 - base - rise * .8) * H).toFixed(1)}`).join("");
// The ivory of the page meets the photograph along the crown. "below": the
// page rises into the image (hero). "above": the image rises into the page.
export function EmblemHorizon({ side, className = "" }: { side: "below" | "above"; className?: string }) {
  const [face, echo] = side === "below" ? [0, .2] : [.12, 0];
  const close = side === "below" ? `V${H}H0Z` : "V0H0Z";
  return <div className={`emblem-horizon emblem-horizon--${side} ${className}`} aria-hidden="true">
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" fill="none">
      <path d={profile(echo, .03) + close} className="emblem-horizon-echo" />
      <path d={profile(echo, .03)} stroke="currentColor" strokeOpacity=".35" vectorEffect="non-scaling-stroke" pathLength={1} data-draw />
      <path d={profile(face) + close} className="emblem-horizon-face" />
      <path d={profile(face)} stroke="currentColor" vectorEffect="non-scaling-stroke" pathLength={1} data-draw />
    </svg>
    <span className="emblem-horizon-apex" style={{ top: `${(1 - face - .8) * 100}%` }} />
  </div>;
}
// The emblem's gold diagonal beam and the wing seams around it, as a drafting overlay.
export function EmblemBeam({ className = "" }: { className?: string }) {
  return <svg className={`emblem-beam ${className}`} viewBox="0 0 560 458" fill="none" aria-hidden="true"><path d="M214 155 420 291M214 210 420 354" pathLength={1} stroke="currentColor" vectorEffect="non-scaling-stroke" data-draw /><path d="M217 79 286 28V192M294 28 352 74V209M148 185 210 138V286M358 107 417 152V276" pathLength={1} stroke="currentColor" strokeOpacity=".45" vectorEffect="non-scaling-stroke" data-draw /></svg>;
}
