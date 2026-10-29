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
export function Button({ href, children, variant = "gold", className = "" }: { href: string; children: React.ReactNode; variant?: "gold" | "outline" | "navy"; className?: string }) {
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
export function ArchitecturalPattern({ className = "" }: { className?: string }) {
  return <svg className={`architectural-pattern ${className}`} viewBox="0 0 400 500" fill="none" aria-hidden="true"><path d="M20 470V240L100 180V410M100 440V150L180 90V350M180 380V70L260 10V300M260 330V100L340 160V400M20 470L190 240L380 470M70 470L190 310L320 470M20 240L260 410M100 150L340 320M180 70L380 210" stroke="currentColor" strokeWidth="1" /></svg>;
}
