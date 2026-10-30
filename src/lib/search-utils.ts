/** Public indexing requires an explicit, secure production origin. */
export function resolveSiteOrigin(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/" || url.port) return null;
    if (!host.includes(".") || /^\d+(?:\.\d+){3}$/.test(host) || host.includes(":")) return null;
    if (host === "localhost" || /\.(?:localhost|local|test|invalid|example)$/.test(host)) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function searchConfiguration(env: Record<string, string | undefined>) {
  const origin = resolveSiteOrigin(env.NEXT_PUBLIC_SITE_URL);
  const flag = env.NEXT_PUBLIC_SITE_INDEXABLE?.trim().toLowerCase();
  return { origin, indexable: Boolean(origin) && (!flag || flag === "true") };
}

export function publicUrl(origin: string | null, path: string): string | undefined {
  if (!origin) return undefined;
  if (!path.startsWith("/") || path.startsWith("//")) throw new Error("Expected a site-relative path");
  const url = new URL(path, `${origin}/`);
  if (url.origin !== origin) throw new Error("URL must remain on the configured origin");
  return url.href;
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
