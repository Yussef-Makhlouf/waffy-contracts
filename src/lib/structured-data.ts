import { brand } from "@/config/brand";
import { contact, contactLinks, phoneHref, socialHref } from "@/config/contact";
import { searchPages, type SearchPath } from "@/content/search";
import { services, networkCategories } from "@/content/services";
import { itServiceGroups } from "@/content/network-it";
import { publicUrl } from "./search-utils";

// Relative identifiers are valid URI references in previews. Public URL fields
// are emitted only after a real production origin has been configured.
function reference(origin: string | null, path: string, fragment: string) {
  return publicUrl(origin, `${path}#${fragment}`) ?? `${path}#${fragment}`;
}

export function siteStructuredData(origin: string | null) {
  const organization = reference(origin, "/", "organization");
  const sameAs = contact.socialLinks.map(profile => socialHref(profile.url)).filter((url): url is string => Boolean(url));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": organization, name: brand.name, alternateName: brand.englishName,
        ...(origin ? { url: publicUrl(origin, "/"), logo: publicUrl(origin, brand.logo.dark) } : {}),
        ...(phoneHref(contact.phone) ? { telephone: contact.phone } : {}),
        ...(contactLinks.email ? { email: contact.email } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite", "@id": reference(origin, "/", "website"), name: brand.name, alternateName: brand.englishName,
        inLanguage: "ar-SA", publisher: { "@id": organization },
        ...(origin ? { url: publicUrl(origin, "/") } : {}),
      },
    ],
  };
}

function catalogue(path: SearchPath) {
  if (path === "/services") return [
    ...services.map(service => ({ id: service.id, name: service.title, description: service.description })),
    { id: "network-it", name: searchPages["/services/network-it"].label, description: searchPages["/services/network-it"].summary },
  ];
  if (path === "/services/networks") return networkCategories.map(category => ({ id: `network-${category.id}`, name: category.title, description: category.text }));
  if (path === "/services/network-it") return itServiceGroups.map(group => ({ id: group.id, name: group.title, description: group.description }));
  return [];
}

export function pageStructuredData(path: SearchPath, origin: string | null) {
  const page = searchPages[path];
  const ref = (fragment: string) => reference(origin, path, fragment);
  const url = publicUrl(origin, path);
  const items = catalogue(path);
  const ancestors: SearchPath[] = path === "/" ? ["/"] : path.startsWith("/services/") ? ["/", "/services", path] : ["/", path];
  const graph: Record<string, unknown>[] = [
    {
      "@type": path === "/contact" ? "ContactPage" : items.length ? "CollectionPage" : "WebPage",
      "@id": ref("webpage"), name: page.title, description: page.description, inLanguage: "ar-SA", dateModified: page.updated,
      isPartOf: { "@id": reference(origin, "/", "website") }, about: { "@id": reference(origin, "/", "organization") },
      hasPart: { "@id": ref("questions") },
      ...(url ? { url, primaryImageOfPage: { "@type": "ImageObject", url: publicUrl(origin, page.image), width: 1200, height: 630, caption: page.imageAlt } } : {}),
      ...(url && ancestors.length > 1 ? { breadcrumb: { "@id": ref("breadcrumbs") } } : {}),
      ...(items.length ? { mainEntity: { "@id": ref("catalogue") } } : {}),
    },
    {
      "@type": "FAQPage", "@id": ref("questions"), name: page.answerHeading, inLanguage: "ar-SA",
      isPartOf: { "@id": ref("webpage") }, dateModified: page.updated,
      mainEntity: page.faqs.map(faq => ({
        "@type": "Question", "@id": ref(`faq-${faq.id}`), name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
  if (url && ancestors.length > 1) graph.push({
    "@type": "BreadcrumbList", "@id": ref("breadcrumbs"),
    itemListElement: ancestors.map((ancestor, index) => ({ "@type": "ListItem", position: index + 1, name: searchPages[ancestor].label, item: publicUrl(origin, ancestor) })),
  });
  if (items.length) graph.push({
    "@type": "ItemList", "@id": ref("catalogue"), name: page.label, numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "Thing", "@id": ref(item.id), name: item.name, description: item.description, ...(url ? { url: publicUrl(origin, `${path}#${item.id}`) } : {}) },
    })),
  });
  return { "@context": "https://schema.org", "@graph": graph };
}
