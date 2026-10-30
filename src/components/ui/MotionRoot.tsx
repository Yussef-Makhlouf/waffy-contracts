"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useGSAP(() => {
    const media = gsap.matchMedia(scope);
    media.add("(prefers-reduced-motion: no-preference)", context => {
      const root = scope.current;
      if (!root) return;
      gsap.from("[data-hero-reveal]", { y: 20, opacity: 0.25, duration: 0.85, stagger: 0.12, ease: "power2.out" });
      gsap.from("[data-hero-image]", { scale: 1.07, duration: 2.2, ease: "power2.out" });
      gsap.to("[data-hero-image]", { yPercent: 7, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach(image => {
        gsap.fromTo(image, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: image.closest("[data-parallax-host]") ?? image, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // Decorative layers only: copy and data keep full contrast, and these
      // start hidden here, so nothing stays hidden if scripts never run.
      const entrances = new Map<Element, () => void>();
      root.querySelectorAll<SVGPathElement>("[data-draw]").forEach(path => {
        gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
        entrances.set(path, () => gsap.to(path, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }));
      });
      root.querySelectorAll<HTMLElement>("[data-rule]").forEach(rule => {
        const axis = rule.dataset.rule === "y" ? "scaleY" : "scaleX";
        gsap.set(rule, { [axis]: 0 });
        entrances.set(rule, () => gsap.to(rule, { [axis]: 1, duration: 1.1, ease: "power3.out" }));
      });
      root.querySelectorAll<HTMLElement>("[data-curtain]").forEach(curtain => {
        gsap.set(curtain, { scaleY: 1 });
        entrances.set(curtain, () => gsap.to(curtain, { scaleY: 0, duration: 1.2, ease: "power3.inOut" }));
      });
      // Below-fold copy only glides; its opacity is never reduced.
      root.querySelectorAll("[data-reveal]").forEach(element => entrances.set(element, () => gsap.from(element, { y: 24, duration: 0.65, ease: "power2.out" })));

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const play = entrances.get(entry.target);
          if (play) context.add(play);
        });
      }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });
      entrances.forEach((_, element) => observer.observe(element));
      return () => observer.disconnect();
    });
    return () => media.revert();
  }, { scope, dependencies: [pathname], revertOnUpdate: true });
  return <div ref={scope}>{children}</div>;
}
