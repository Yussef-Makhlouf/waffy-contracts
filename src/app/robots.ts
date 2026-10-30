import type { MetadataRoute } from "next";
import { siteOrigin, siteIndexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return siteOrigin && siteIndexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteOrigin}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
