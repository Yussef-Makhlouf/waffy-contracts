"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useGSAP(() => {
    const media = gsap.matchMedia(scope);
    media.add("(prefers-reduced-motion: no-preference)", context => {
      gsap.from("[data-hero-reveal]", { y: 20, opacity: 0.25, duration: 0.85, stagger: 0.12, ease: "power2.out" });
      // One native observer keeps below-fold copy at full contrast and avoids
      // loading a scroll engine for these simple, one-time entrances.
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          context.add(() => gsap.from(entry.target, { y: 24, duration: 0.65, ease: "power2.out" }));
        });
      }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });
      scope.current?.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
      return () => observer.disconnect();
    });
    return () => media.revert();
  }, { scope, dependencies: [pathname], revertOnUpdate: true });
  return <div ref={scope}>{children}</div>;
}
