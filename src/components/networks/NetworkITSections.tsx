import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowTopLeftIcon, CheckIcon, Component1Icon, DesktopIcon, LockClosedIcon, PlusIcon, Share2Icon } from "@radix-ui/react-icons";
import { itServiceGroups, networkIT } from "@/content/network-it";
import styles from "./NetworkITSections.module.css";

const icons = { cabling: Share2Icon, connectivity: Component1Icon, rooms: DesktopIcon, systems: LockClosedIcon };

function SectionLabel({ children, english }: { children: React.ReactNode; english: string }) {
  return <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#765a31]"><span className="h-px w-8 bg-[#9d7c44]" data-rule aria-hidden="true" /><span>{children}</span><span lang="en" dir="ltr" className="w-full text-[9px] tracking-[.18em] text-[#586371] md:ms-2 md:w-auto md:border-s md:border-[#071d37]/20 md:ps-4">{english}</span></div>;
}

function SectionAction({ children }: { children: React.ReactNode }) {
  return <Link className={styles.cta} href={networkIT.route}><span>{children}</span><ArrowLeftIcon width={20} height={20} aria-hidden="true" /></Link>;
}

export function HomeNetworkITSection() {
  return <section id="network-it" className={`${styles.home} overflow-clip py-20 md:py-28`} aria-labelledby="home-network-it-title"><div className="container">
    <div className="mb-10 flex items-center justify-between gap-6 border-t border-[#071d37]/20 pt-6 md:mb-14"><span className="text-xs text-[#586371]">من البناء، إلى الاتصال.</span><span lang="en" dir="ltr" className="text-[9px] tracking-[.2em] text-[#765a31]">THE CONNECTED BUILDING</span></div>
    <div className="grid items-center gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-12 lg:gap-20">
      <div className="max-w-lg" data-reveal><SectionLabel english="NETWORKS & IT">الشبكات وتقنية المعلومات</SectionLabel><h2 id="home-network-it-title" className="text-[32px] leading-[1.7] md:text-[42px] lg:text-[47px]">المكان يكتمل،<br /><span className="text-[#846333]">حين تتصل تفاصيله.</span></h2><p className={`${styles.homeIntro} text-[15px] leading-[2.2] text-[#586371]`}>المساحات تُبنى للاستخدام. وشبكات البيانات والاتصال جزء من جاهزيتها. اكتشف مجالات التمديدات وغرف الاتصالات والأنظمة المرتبطة بتشغيل المبنى.</p><div className="mt-8 md:mt-10"><SectionAction>اكتشف الشبكات وتقنية المعلومات</SectionAction></div><p className={`${styles.footnote} text-xs leading-[2] text-[#586371]`}>بنية تقنية تُنسَّق مع أعمال المقاولات، من المخطط إلى التسليم.</p></div>
      <figure className={`${styles.homeVisual} relative mb-14 md:mb-10`}>
        <div className={`${styles.homePhoto} relative aspect-[5/4.5] overflow-hidden bg-[#ddd6c9] md:aspect-[5/4.8]`}><Image src={networkIT.images.installation.src} alt={networkIT.images.installation.alt} fill sizes="(min-width: 1280px) 630px, (min-width: 768px) 51vw, 100vw" className="object-cover" /><span className={styles.photoShade} aria-hidden="true" /><div className="absolute start-5 end-5 top-5 flex justify-between gap-4 text-[#f7f5ef] md:start-7 md:end-7"><span className="text-[11px]">التقنية ضمن تفاصيل البناء</span><span lang="en" dir="ltr" className="text-[9px] tracking-[.14em]">SITE / CONNECTION</span></div></div>
        <svg className={styles.homePaths} viewBox="0 0 640 500" fill="none" aria-hidden="true"><path d="M5 90h80l40-40h245M300 495v-40l65-65h270" stroke="currentColor" pathLength={1} data-draw /><path d="M5 135h95l40-40h100M410 495v-30l30-30h195" stroke="currentColor" strokeOpacity=".35" pathLength={1} data-draw /><circle cx="125" cy="50" r="4" fill="#f7f5ef" stroke="currentColor" /><circle cx="365" cy="390" r="4" fill="#f7f5ef" stroke="currentColor" /></svg>
        <div className={styles.homeInset}><div className="relative aspect-[4/3] overflow-hidden"><Image src={networkIT.images.cabling.src} alt="تصور لتفاصيل التوصيلات المنظّمة داخل خزانة شبكات" fill sizes="(min-width: 768px) 200px, 140px" className="object-cover" /></div><span className="block border-t border-[#d7b475]/30 px-3 py-2 text-[10px] text-[#e9ddc7]">دقّة تبدأ من أصغر توصيلة.</span></div>
        <figcaption className={styles.homeCaption}><Share2Icon width={24} height={24} aria-hidden="true" /><div><span className="block text-sm md:text-base">أساس منظّم.<br />واتصال مدروس.</span><span lang="en" dir="ltr" className="mt-1 block text-[8px] tracking-[.15em] text-[#d7b475]">CONNECTED BY DESIGN</span></div></figcaption>
      </figure>
    </div>
    <nav className="mt-4 grid grid-cols-1 border-t border-[#071d37]/25 md:mt-9 md:grid-cols-2 lg:grid-cols-4" aria-label="تخصصات تقنية المعلومات في الرئيسية">{itServiceGroups.map(service => {
      const Icon = icons[service.icon];
      return <Link key={service.id} href={`${networkIT.route}#${service.id}`} className={`${styles.capabilityLink} group flex items-start gap-4 border-b border-[#071d37]/15 py-5 md:pe-5 md:py-7`}><span lang="en" className="pt-1 text-[10px] text-[#765a31]">{service.number}</span><span className="flex-1"><Icon width={22} height={22} className="mb-3 text-[#846333]" aria-hidden="true" /><span className="block text-sm leading-[1.9]">{service.title}</span></span><ArrowTopLeftIcon width={18} height={18} className="mt-1 shrink-0 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" aria-hidden="true" /></Link>;
    })}</nav>
    <p className={`${styles.footnote} text-[11px] leading-[2] text-[#586371]`}>{networkIT.imageNote}</p>
  </div></section>;
}

function ConnectedSystemsDiagram() {
  return <figure className={styles.diagram}>
    <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4 text-[#e9ddc7]"><span className="text-xs">مبنى واحد. أنظمة مترابطة.</span><span lang="en" dir="ltr" className="text-[9px] tracking-[.16em]">SYSTEM MAP</span></div>
    <svg className="my-3 block h-auto w-full" viewBox="0 0 560 310" fill="none" role="img" aria-labelledby="it-services-diagram-title"><title id="it-services-diagram-title">تصوّر لترابط غرفة الاتصالات مع نقاط البيانات والاتصال اللاسلكي وأنظمة المبنى، وليس مخططًا تنفيذيًا</title><defs><pattern id="it-services-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" stroke="#d7b475" strokeOpacity=".08" /></pattern></defs><rect width="560" height="310" fill="url(#it-services-grid)" /><g stroke="#d7b475" strokeWidth="1.3"><path d="M240 150H140l-30-30H60M320 150h100l30-30h50M240 190H140l-30 50H60M320 190h100l30 50h50" pathLength={1} data-draw /><rect x="240" y="104" width="80" height="132" rx="3" /><path d="M250 122h60v24h-60zM250 154h60v24h-60zM250 186h60v24h-60zM259 134h26M259 166h26M259 198h26" /><circle cx="299" cy="134" r="2" /><circle cx="299" cy="166" r="2" /><circle cx="299" cy="198" r="2" /></g><g fill="#071d37" stroke="#d7b475" strokeWidth="1.3"><circle cx="60" cy="120" r="24" /><circle cx="500" cy="120" r="24" /><circle cx="60" cy="240" r="24" /><circle cx="500" cy="240" r="24" /></g><g stroke="#e9ddc7" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M48 121q12-15 24 0M53 125q7-9 14 0M58 130h4M489 113h22v14h-22zM500 127v6M494 133h12M51 236h18v13H51zM55 236v-4a5 5 0 0 1 10 0v4M490 235h20v12h-20zM500 235v-6M495 247v5M505 247v5" /></g></svg>
    <figcaption className="flex justify-between gap-3 text-[10px] text-[#cad4dd]"><span>غرفة الاتصالات هي نقطة الالتقاء.</span><span className="text-[#d7b475]">رسم مفاهيمي</span></figcaption>
  </figure>;
}

export function NetworkITServicesSection() {
  return <section id="network-it" className={`${styles.services} py-20 md:py-28`} aria-labelledby="services-network-it-title"><div className="container">
    <div className="mb-10 grid gap-7 md:mb-14 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16" data-reveal><div><SectionLabel english="DIGITAL INFRASTRUCTURE">خدمات الشبكات وتقنية المعلومات</SectionLabel><h2 id="services-network-it-title" className="text-[31px] leading-[1.7] md:text-[41px]">من مسار الكابل،<br /><span className="text-[#846333]">إلى تكامل الأنظمة.</span></h2></div><p className="max-w-lg text-sm leading-[2.2] text-[#586371] md:text-[15px]">مجال تقني ضمن أعمال المقاولات، يبدأ بمراجعة احتياجات المبنى وينتهي بنطاق واضح للتنفيذ والفحص والتوثيق. استعرض التخصصات وحدّد نقطة البداية لمشروعك.</p></div>
    <div className="grid items-start gap-10 md:grid-cols-[.95fr_1.05fr] lg:gap-16">
      <div className={styles.systemsBoard} data-reveal><ConnectedSystemsDiagram /><div className="relative mx-5 mb-5 aspect-[5/2.7] overflow-hidden md:mx-7 md:mb-7"><Image src={networkIT.images.cabling.src} alt={networkIT.images.cabling.alt} fill sizes="(min-width: 1280px) 560px, (min-width: 768px) 44vw, 100vw" className="object-cover" /><span className="absolute bottom-4 start-4 border border-white/25 bg-[#071d37]/90 px-3 py-2 text-[10px] text-[#f7f5ef] backdrop-blur-sm">التنظيم جزء من جودة التنفيذ.</span></div></div>
      <div className="border-t border-[#071d37]/25" data-reveal>{itServiceGroups.map((service, index) => {
        const Icon = icons[service.icon];
        return <details key={service.id} name="network-it-services" open={index === 0} className={styles.serviceDetails}>
          <summary className="flex min-h-24 cursor-pointer items-center gap-4 py-5 md:gap-5"><span lang="en" className="text-[11px] text-[#765a31]">{service.number}</span><Icon width={24} height={24} className="shrink-0 text-[#846333]" aria-hidden="true" /><h3 className="flex-1 text-lg leading-[1.8] lg:text-xl">{service.title}</h3><PlusIcon width={21} height={21} className={styles.expandIcon} aria-hidden="true" /></summary>
          <div className="pb-7 ps-0 md:ps-9"><p className={`${styles.detailDescription} text-[13px] leading-[2.1] text-[#586371]`}>{service.description}</p><ul className="space-y-3">{service.items.map(item => <li key={item} className="flex items-start gap-3 text-xs leading-[2]"><CheckIcon width={16} height={16} className="mt-1 shrink-0 text-[#846333]" aria-hidden="true" /><span>{item}</span></li>)}</ul><Link className={styles.detailLink} href={`${networkIT.route}#${service.id}`}>تفاصيل هذا التخصص<ArrowTopLeftIcon width={17} height={17} aria-hidden="true" /></Link></div>
        </details>;
      })}</div>
    </div>
    <div className="mt-10 grid items-center gap-7 border-t border-[#071d37]/20 pt-7 md:mt-12 md:grid-cols-[1fr_auto] md:gap-12"><p className="max-w-2xl text-xs leading-[2.1] text-[#586371]">{networkIT.scopeNote}</p><SectionAction>اكتشف الشبكات وتقنية المعلومات</SectionAction></div>
    <p className={`${styles.footnote} text-[11px] leading-[2] text-[#586371]`}>{networkIT.imageNote}</p>
  </div></section>;
}
