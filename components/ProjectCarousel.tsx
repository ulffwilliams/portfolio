"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "./projectsData";
import ProjectCard from "./ProjectCard";
import { useProjectModal } from "./ProjectModalContext";

export default function ProjectCarousel() {
  const { openProject } = useProjectModal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(() =>
    projects.map((_, i) => i === 0)
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Drag state
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);

    // A card "counts as showing" when at least half its width is in view.
    // Desktop fits two 48%-wide cards, so two dots light up at once.
    const left = el.scrollLeft;
    const right = left + el.clientWidth;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    setVisible(
      Array.from(cards).map((c) => {
        const cl = c.offsetLeft;
        const cr = cl + c.offsetWidth;
        const overlap = Math.min(right, cr) - Math.max(left, cl);
        return overlap / c.offsetWidth >= 0.5;
      })
    );
  }, []);

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 32 : el.clientWidth;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  // Pointer drag-to-scroll
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };
  // Block the card's click if the pointer was dragged.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <div
            key={project.slug}
            data-card
            className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[48%]"
          >
            <ProjectCard
              project={project}
              onOpen={() => openProject(project.slug)}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-3 border-2 border-black transition-all ${
                visible[i] ? "w-8 bg-black" : "w-3 bg-transparent"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous project"
            className="border-4 bg-white text-black p-2 transition hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next project"
            className="border-4 bg-white text-black p-2 transition hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
