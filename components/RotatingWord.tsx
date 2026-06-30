"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface RotatingWordProps {
  words: string[];
  interval?: number; // ms between swaps
  className?: string;
}

export default function RotatingWord({
  words,
  interval = 3000,
  className = "",
}: RotatingWordProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const index = useRef(0);

  // Lock the wrapper to the widest word + one line tall so the surrounding
  // sentence never reflows as words swap. Re-measure on resize (font scales).
  useEffect(() => {
    const measure = () => {
      const el = innerRef.current;
      const wrap = wrapRef.current;
      if (!el || !wrap) return;
      const current = el.textContent;
      let max = 0;
      for (const w of words) {
        el.textContent = w;
        max = Math.max(max, el.offsetWidth);
      }
      wrap.style.width = `${max}px`;
      // +6px clears descenders from the underline (border-box eats the border).
      wrap.style.height = `${el.offsetHeight + 6}px`;
      el.textContent = current ?? words[index.current];
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [words]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || words.length < 2) return;

    const id = setInterval(() => {
      index.current = (index.current + 1) % words.length;
      const next = words[index.current];
      gsap.to(el, {
        yPercent: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = next;
          gsap.fromTo(
            el,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    }, interval);

    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span
      ref={wrapRef}
      className={`relative inline-block overflow-hidden align-bottom border-b-4 border-black text-chart-2 ${className}`}
    >
      <span
        ref={innerRef}
        className="inline-block whitespace-nowrap will-change-transform"
      >
        {words[0]}
      </span>
    </span>
  );
}
