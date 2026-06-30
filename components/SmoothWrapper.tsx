"use client";
import { useEffect } from "react";
import { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

interface SmoothWrapperProps {
  children: ReactNode;
}

export default function SmoothWrapper({ children }: SmoothWrapperProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    // Route in-page anchor clicks through ScrollSmoother — native jumps
    // desync from the faked transform scroll and lock the page.
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      smoother.scrollTo(target, true, "top 80px");
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div
        id="smooth-content"
        className="flex flex-col align-start w-full overflow-visible"
      >
        {children}
      </div>
    </div>
  );
}
