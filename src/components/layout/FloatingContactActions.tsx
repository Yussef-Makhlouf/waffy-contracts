"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { contactLinks } from "@/config/contact";
import { CallIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import styles from "./FloatingContactActions.module.css";

type Channel = "phone" | "whatsapp";
const channels = [
  { id: "whatsapp" as const, label: "التواصل عبر واتساب", title: "واتساب", message: "سيُضاف رقم واتساب الرسمي عند توفره." },
  { id: "phone" as const, label: "اتصال مباشر بالوافي", title: "الاتصال المباشر", message: "سيُضاف رقم الاتصال الرسمي عند توفره." },
];

export function FloatingContactActions() {
  const root = useRef<HTMLElement>(null);
  const controls = useRef<Map<Channel, HTMLElement>>(new Map());
  const noticeId = useId();
  const [active, setActive] = useState<Channel | null>(null);
  const selected = channels.find(channel => channel.id === active);

  function togglePending(event: MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.dataset.channel as Channel;
    setActive(previous => previous === id ? null : id);
  }
  function closeNotice() {
    if (active) controls.current.get(active)?.focus();
    setActive(null);
  }
  useEffect(() => {
    if (!active) return;
    function onOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setActive(null);
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (active) controls.current.get(active)?.focus();
      setActive(null);
    }
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [active]);

  return <aside ref={root} className={`floating-actions ${styles.root}`} aria-label="تواصل مباشر">
    {selected && <div className={styles.notice} id={noticeId}><div className={styles.noticeTop}><strong>{selected.title}</strong><button className={styles.close} onClick={closeNotice} aria-label="إغلاق تنبيه التواصل"><Cross2Icon width={16} height={16} /></button></div><p role="status">{selected.message}</p></div>}
    {channels.map(channel => {
      const href = contactLinks[channel.id];
      const className = `floating-action ${styles.action} ${channel.id === "whatsapp" ? `whatsapp ${styles.whatsapp}` : ""}`;
      const icon = channel.id === "whatsapp" ? <WhatsAppIcon size={25} /> : <CallIcon size={23} />;
      return href ? <a key={channel.id} data-contact-action={channel.id} className={className} href={href} target={channel.id === "whatsapp" ? "_blank" : undefined} rel={channel.id === "whatsapp" ? "noopener noreferrer" : undefined} aria-label={channel.label} title={channel.label}>{icon}</a> : <button key={channel.id} ref={element => { if (element) controls.current.set(channel.id, element); else controls.current.delete(channel.id); }} type="button" data-contact-action={channel.id} data-channel={channel.id} onClick={togglePending} className={className} aria-label={`${channel.label} — الرقم سيُضاف لاحقًا`} aria-expanded={active === channel.id} aria-controls={active === channel.id ? noticeId : undefined} title={`${channel.title} — الرقم سيُضاف لاحقًا`}>{icon}</button>;
    })}
  </aside>;
}
