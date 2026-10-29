"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type KeyboardEvent } from "react";
import { Menu, X, ArrowUpLeft } from "lucide-react";
import { brand } from "@/config/brand";
import { navigation } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  function isActive(href: string) { return href === pathname; }
  function openMenu() { dialog.current?.showModal(); setOpen(true); }
  function closeMenu() { dialog.current?.close(); }
  function onClosed() { setOpen(false); menuButton.current?.focus(); }
  function onMenuKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = dialog.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  return <>
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-link" href="/" aria-label={`${brand.name} — الرئيسية`}><Image src={brand.logo.dark} alt={brand.name} width={116} height={93} preload /></Link>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">{navigation.map(item => <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav>
        <Link className="header-cta" href="/contact">لنتحدث عن مشروعك<ArrowUpLeft size={17} aria-hidden="true" /></Link>
        <button ref={menuButton} className="menu-button" onClick={openMenu} aria-label="فتح قائمة التنقل" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog"><Menu size={25} /></button>
      </div>
    </header>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-navigation" aria-labelledby="mobile-menu-title" onClose={onClosed} onKeyDown={onMenuKeyDown}>
      <div className="mobile-menu-top"><span id="mobile-menu-title">القائمة الرئيسية</span><button className="close-menu" onClick={closeMenu} aria-label="إغلاق قائمة التنقل"><X /></button></div>
      <nav aria-label="التنقل عبر الجوال">{navigation.map((item, i) => <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={isActive(item.href) ? "page" : undefined}><span className="index" aria-hidden="true">0{i + 1}</span>{item.label}<ArrowUpLeft size={23} aria-hidden="true" /></Link>)}</nav>
      <p className="mobile-tagline">{brand.tagline}</p>
    </dialog>
  </>;
}
