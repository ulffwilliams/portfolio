"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    // First-screen elements to fade in once the curtain clears.
    const intro = gsap.utils.toArray<HTMLElement>("[data-intro]");

    // Skip the whole thing for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(intro, { clearProps: "all" });
      setDone(true);
      return;
    }

    // Freeze the page behind the curtain while it plays.
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    window.scrollTo(0, 0);

    // Hide them up front (behind the curtain) so they can fade in after.
    gsap.set(intro, { opacity: 0, y: 30 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          smoother?.paused(false);
          setDone(true);
        },
      });

      tl.from(nameRef.current, { yPercent: 120, opacity: 0, duration: 0.7 })
        .from(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center", duration: 0.6 },
          "-=0.3"
        )
        .to({}, { duration: 0.45 }) // hold
        .to(nameRef.current, {
          yPercent: -120,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        })
        .to(
          panelRef.current,
          { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
          "-=0.2"
        )
        // Curtain gone — stagger the page in.
        .to(
          intro,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "transform",
          },
          "-=0.35"
        );
    });

    return () => {
      smoother?.paused(false);
      gsap.set(intro, { clearProps: "all" });
      ctx.revert();
    };
  }, [mounted]);

  if (!mounted || done) return null;

  return createPortal(
    <div
      ref={panelRef}
      className="fixed inset-0 z-200 flex items-center justify-center bg-gray-950 text-white"
    >
      <div className="overflow-hidden flex flex-col items-center gap-4 px-6">
        <h1
          ref={nameRef}
          className="text-5xl md:text-8xl uppercase tracking-wide text-center"
        >
          William Ulff
        </h1>
        <span ref={lineRef} className="block h-1 w-40 md:w-72 bg-chart-2" />
      </div>
    </div>,
    document.body
  );
}
