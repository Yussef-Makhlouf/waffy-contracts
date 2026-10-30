import type { MetadataRoute } from "next";
import { siteOrigin, siteIndexable } from "@/lib/seo";
import { searchPages, searchPaths } from "@/content/search";
import { publicUrl } from "@/lib/search-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin || !siteIndexable) return [];
  return searchPaths.map(path => ({ url: publicUrl(siteOrigin, path)!, lastModified: searchPages[path].updated }));
}
