"use client";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.4,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip on touch / reduced-motion — magnetic pull only makes sense with a cursor.
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches)
      return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      xTo(mx * strength);
      yTo(my * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
