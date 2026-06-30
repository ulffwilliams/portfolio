"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mount once. Animates any [data-reveal] element up+in as it scrolls into view.
 * Batched so elements entering together stagger as a group.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    gsap.set(els, { opacity: 0, y: 40 });

    const show = (targets: Element[]) =>
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        overwrite: true,
      });
    // Scrolling back up — fade away + drift down as it exits off the bottom.
    const fadeAway = (targets: Element[]) =>
      gsap.to(targets, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.08,
        overwrite: true,
      });

    const batch = ScrollTrigger.batch(els, {
      start: "top 88%", // reveal as it enters from the bottom
      // Reveal on entry; fade back away once scrolled back off the BOTTOM.
      // Never hide while leaving the top, so it never vanishes on screen.
      onEnter: show,
      onLeaveBack: fadeAway,
    });

    // Smoother/layout settle — recalc trigger positions after first paint.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(id);
      batch.forEach((st) => st.kill());
      gsap.set(els, { clearProps: "opacity,transform" });
    };
  }, []);

  return null;
}
