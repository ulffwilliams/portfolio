"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Project } from "./projectsData";
import ImageCarousel from "./ImageCarousel";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Entrance animation — backdrop fade + panel scale/slide-up.
  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(overlayRef.current, { autoAlpha: 0, duration: 0.25, ease: "power2.out" })
        .from(
          panelRef.current,
          {
            autoAlpha: 0,
            y: 40,
            scale: 0.95,
            duration: 0.4,
            ease: "back.out(1.6)",
          },
          "-=0.1"
        );
    });
    return () => ctx.revert();
  }, [mounted]);

  // Close on Escape + freeze the page behind the modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // Pause ScrollSmoother (transform-based) instead of body overflow — body
    // lock doesn't stop the smoother and leaves ScrollTriggers stale on close.
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);

    return () => {
      document.removeEventListener("keydown", onKey);
      smoother?.paused(false);
      // Recompute trigger positions so reveals don't snap after re-entry.
      ScrollTrigger.refresh();
    };
  }, [onClose]);

  if (!mounted) return null;

  // Portal to body — ScrollSmoother transforms #smooth-content and breaks
  // position:fixed for anything rendered inside it.
  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8 bg-black/80 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl bg-white border-4 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 border-4 bg-white text-black p-1 hover:bg-black hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col gap-6 p-5 md:p-8">
          <header className="flex flex-col gap-2 pr-12">
            <h2 className="text-3xl md:text-4xl uppercase">{project.title}</h2>
            <p className="font-normal text-gray-700">{project.blurb}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs uppercase text-gray-500 mt-1">
              {project.role && (
                <span className=" text-chart-2">{project.role}</span>
              )}
              {project.year && (
                <span className=" text-chart-2">{project.year}</span>
              )}
            </div>
          </header>

          <ImageCarousel images={project.images} alt={project.title} />

          <div className="flex flex-col gap-4">
            {project.description.map((p, i) => (
              <p key={i} className="font-thin leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-950 text-white font-thin text-sm px-3 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 px-6 py-3 uppercase text-center !text-black no-underline hover:bg-gray-900 hover:!text-white transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
