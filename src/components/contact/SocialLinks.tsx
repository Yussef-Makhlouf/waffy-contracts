"use client";

import { useId, useState, type MouseEvent } from "react";
import { contact, socialHref } from "@/config/contact";
import { SocialBrandIcon } from "@/components/ui/BrandIcons";
import styles from "./SocialLinks.module.css";

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const noteId = useId();
  const [message, setMessage] = useState<string | null>(null);
  const pending = contact.socialLinks.some(profile => !socialHref(profile.url));
  function showPending(event: MouseEvent<HTMLButtonElement>) {
    setMessage(`سيُضاف رابط ${event.currentTarget.dataset.label} الرسمي عند توفره.`);
  }
  return <div className={`${styles.root} ${compact ? styles.compact : ""}`}>
    {!compact && <h3 className={styles.heading}>منصات التواصل الاجتماعي</h3>}
    <div className={styles.grid} role="group" aria-label="منصات التواصل الاجتماعي">{contact.socialLinks.map(profile => {
      const href = socialHref(profile.url);
      return <div className={styles.item} key={profile.platform}>
        {href ? <a className={styles.icon} href={href} target="_blank" rel="noopener noreferrer" aria-label={profile.label} title={profile.label}><SocialBrandIcon platform={profile.platform} /></a> : <button type="button" className={styles.icon} onClick={showPending} data-label={profile.label} aria-label={`${profile.label} — الرابط سيُضاف لاحقًا`} aria-describedby={noteId} title={`${profile.label} — الرابط سيُضاف لاحقًا`}><SocialBrandIcon platform={profile.platform} /></button>}
        {!compact && <span className={styles.label}>{profile.label}</span>}
      </div>;
    })}</div>
    {(pending || message) && <p className={styles.note} id={noteId} role="status">{message || "تُضاف روابط الحسابات الرسمية هنا عند توفرها."}</p>}
  </div>;
}
