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
// The stepped crown of the eight emblem wings (alwafi-icon.svg, crown at y=28),
// stretched across a band whose height is the CSS --peak used by .emblem-mask.
const rooflinePath = "M0 388H37V275L87 233H89V232H91L140 198H144V157H148L210 110H213.5V51H217L286 0H294L352 46H355V79H358L417 124H419.5V180H422L464 210H468.5V245H473L515 279V388H560";
export function EmblemRoofline({ className = "" }: { className?: string }) {
  return <svg className={`emblem-roofline ${className}`} viewBox="0 0 560 388" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d={rooflinePath} pathLength={1} stroke="currentColor" vectorEffect="non-scaling-stroke" data-draw /></svg>;
}
// The emblem's gold diagonal beam and the wing seams around it, as a drafting overlay.
export function EmblemBeam({ className = "" }: { className?: string }) {
  return <svg className={`emblem-beam ${className}`} viewBox="0 0 560 458" fill="none" aria-hidden="true"><path d="M214 155 420 291M214 210 420 354" pathLength={1} stroke="currentColor" vectorEffect="non-scaling-stroke" data-draw /><path d="M217 79 286 28V192M294 28 352 74V209M148 185 210 138V286M358 107 417 152V276" pathLength={1} stroke="currentColor" strokeOpacity=".45" vectorEffect="non-scaling-stroke" data-draw /></svg>;
}
