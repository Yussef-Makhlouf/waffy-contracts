import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Eyebrow } from "./elements";
import { brand } from "@/config/brand";

export function PageHero({ title, accent, eyebrow, english, description, image = brand.images.hero }: { title: string; accent: string; eyebrow: string; english: string; description: string; image?: string }) {
  return <section className="page-hero"><Image src={image} alt="" fill sizes="100vw" preload /><div className="page-hero-overlay" /><div className="container"><nav className="breadcrumbs" aria-label="مسار الصفحة"><Link href="/">الرئيسية</Link><ChevronLeft size={14} aria-hidden="true" /><span aria-current="page">{eyebrow}</span></nav><div data-hero-reveal><Eyebrow english={english} light>{eyebrow}</Eyebrow><h1>{title}<br /><span>{accent}</span></h1><p>{description}</p></div></div></section>;
}
