import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { NetworksShowcase } from "@/components/networks/NetworksShowcase";
import { HomeNetworkITSection } from "@/components/networks/NetworkITSections";
import { CapabilitiesShowcase } from "@/components/home/CapabilitiesShowcase";
import { WorkProcess } from "@/components/home/WorkProcess";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { pageMetadata } from "@/lib/seo";
import { PageAnswers } from "@/components/search/PageAnswers";
import { PageStructuredData } from "@/components/search/PageStructuredData";

export const metadata = pageMetadata("/");
export default function HomePage() {
  return <><PageStructuredData path="/" /><Hero /><AboutPreview /><ServicesOverview /><HomeNetworkITSection /><NetworksShowcase /><CapabilitiesShowcase /><WorkProcess /><PageAnswers path="/" /><ContactCTA /></>;
}
