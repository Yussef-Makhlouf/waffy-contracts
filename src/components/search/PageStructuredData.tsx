import type { SearchPath } from "@/content/search";
import { siteOrigin } from "@/lib/seo";
import { pageStructuredData } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/search-utils";

export function PageStructuredData({ path }: { path: SearchPath }) {
  return <script type="application/ld+json" data-page-schema dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageStructuredData(path, siteOrigin)) }} />;
}
