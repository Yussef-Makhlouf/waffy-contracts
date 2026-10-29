import Link from "next/link";
import Image from "next/image";
import { ArrowUpLeft } from "lucide-react";
import type { Service } from "@/content/services";
import { ServiceIconView } from "@/components/ui/elements";
import { brand } from "@/config/brand";

export function ServiceCard({ service }: { service: Service }) {
  const featured = service.id === "general-contracting";
  return <Link className={`service-card ${featured ? "service-card--featured" : ""}`} href={`/services#${service.id}`}>
    {featured && <><Image className="service-feature-image" src={brand.images.engineering} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" /><div className="service-feature-overlay" /><span className="service-feature-label" lang="en" aria-hidden="true">FROM VISION<br />TO STRUCTURE.</span></>}
    <div className="service-card-top"><ServiceIconView name={service.icon} /><span className="index" aria-hidden="true">{service.number}</span></div><h3>{service.title}</h3><p>{service.short}</p><span className="service-card-link">اكتشف المجال<ArrowUpLeft size={19} aria-hidden="true" /></span>
  </Link>;
}
