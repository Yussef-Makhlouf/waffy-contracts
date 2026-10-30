import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import type { SocialPlatform } from "@/config/contact";

export function SocialBrandIcon({ platform, size = 23 }: { platform: SocialPlatform; size?: number }) {
  if (platform === "instagram") return <InstagramLogoIcon width={size} height={size} aria-hidden="true" />;
  if (platform === "linkedin") return <LinkedInLogoIcon width={size} height={size} aria-hidden="true" />;
  if (platform === "x") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.5L1.3 2h6.5l4.5 6.6L18.9 2Zm-1.1 18h1.8L6.8 3.9H4.9L17.8 20Z" /></svg>;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.2 22v-9.1h3.1l.5-3.6h-3.6V7c0-1.1.3-1.8 1.8-1.8h1.9V2.1a25 25 0 0 0-2.8-.1c-2.8 0-4.8 1.7-4.8 4.9v2.4H7.1v3.6h3.2V22h3.9Z" /></svg>;
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 1.7 17.8L0 24l6.4-1.7A11.9 11.9 0 0 0 24 11.8c0-3.1-1.2-6.1-3.5-8.3ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4A9.9 9.9 0 1 1 12 21.8Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-.9 1c-.2.2-.4.2-.7.1a8.1 8.1 0 0 1-4-3.5c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6L9 6.8c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5 0-.8.4-.2.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.3 5.2 4.6 1.9.8 2.7.9 3.7.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" /></svg>;
}

export function CallIcon({ size = 23 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6 19.6 19.6 0 0 1-3.1-8.6A2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7 9.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" /></svg>;
}
