import type { Metadata } from "next";
import { brand } from "@/config/brand";

function configuredOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return null;
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) ? url.origin : null;
  } catch { return null; }
}

export const siteOrigin = configuredOrigin();
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: `${title} | ${brand.name}` }, description,
    ...(siteOrigin ? { alternates: { canonical: `${siteOrigin}${path}` } } : {}),
    openGraph: {
      title: `${title} | ${brand.name}`, description, locale: "ar_SA", type: "website", siteName: brand.name,
      ...(siteOrigin ? { url: `${siteOrigin}${path}`, images: [{ url: `${siteOrigin}${brand.images.hero}`, width: 1672, height: 941, alt: "تصور معماري تعبيري للوافي" }] } : {}),
    },
  };
}
