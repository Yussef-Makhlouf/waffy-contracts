import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { NetworksShowcase } from "@/components/networks/NetworksShowcase";
import { CapabilitiesShowcase } from "@/components/home/CapabilitiesShowcase";
import { WhyAlwafi } from "@/components/home/WhyAlwafi";
import { WorkProcess } from "@/components/home/WorkProcess";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("نبني الثقة ونترك الأثر", "الوافي للمقاولات العامة. رؤية معمارية وقيمة راسخة عنوانها الالتزام. استكشف مجالات البناء والشبكات والأعمال المعمارية.", "/");
export default function HomePage() {
  return <><Hero /><AboutPreview /><ServicesOverview /><NetworksShowcase /><CapabilitiesShowcase /><WhyAlwafi /><WorkProcess /><ContactCTA /></>;
}
