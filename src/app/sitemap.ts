import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return ["/", "/services", "/services/networks", "/contact"].map(path => ({ url: `${siteOrigin}${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 }));
}
