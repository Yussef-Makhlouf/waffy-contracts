import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { searchPages, type SearchPath } from "@/content/search";
import { publicUrl, searchConfiguration } from "./search-utils";

export const { origin: siteOrigin, indexable: siteIndexable } = searchConfiguration(process.env);

export const searchRobots: Metadata["robots"] = {
  index: siteIndexable, follow: true,
  googleBot: { index: siteIndexable, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};

export function pageMetadata(path: SearchPath): Metadata {
  const page = searchPages[path];
  const url = publicUrl(siteOrigin, path);
  const image = publicUrl(siteOrigin, page.image);
  return {
    title: { absolute: page.title }, description: page.description,
    ...(url ? { alternates: { canonical: url } } : {}),
    robots: searchRobots,
    openGraph: {
      title: page.title, description: page.description, locale: "ar_SA", type: "website", siteName: brand.name,
      ...(url ? { url } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, type: "image/jpeg", alt: page.imageAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image", title: page.title, description: page.description,
      ...(image ? { images: [{ url: image, alt: page.imageAlt }] } : {}),
    },
  };
}
