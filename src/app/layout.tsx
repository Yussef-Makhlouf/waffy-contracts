import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactActions } from "@/components/layout/FloatingContactActions";
import { MotionRoot } from "@/components/ui/MotionRoot";
import { brand } from "@/config/brand";
import { siteOrigin } from "@/lib/seo";
import "./globals.css";

const arabic = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2", weight: "500", style: "normal" },
  ], variable: "--font-arabic", display: "swap", preload: true,
});
const latin = localFont({ src: [{ path: "../fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" }, { path: "../fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" }], variable: "--font-latin", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: brand.name, template: `%s | ${brand.name}` },
  description: "الوافي للمقاولات العامة — نبني الثقة ونترك الأثر. اكتشف مجالات البناء والبنية التحتية والأعمال المعمارية.",
  ...(siteOrigin ? { metadataBase: new URL(siteOrigin) } : {}),
  applicationName: brand.name,
  robots: { index: Boolean(siteOrigin), follow: true },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#071D37", viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: brand.name, alternateName: brand.englishName, ...(siteOrigin ? { url: siteOrigin, logo: `${siteOrigin}${brand.logo.light}` } : {}) };
  return <html lang="ar" dir="rtl" className={`${arabic.variable} ${latin.variable}`}><body><a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a><Header /><MotionRoot><main id="main-content" tabIndex={-1}>{children}</main></MotionRoot><Footer /><FloatingContactActions /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></body></html>;
}
