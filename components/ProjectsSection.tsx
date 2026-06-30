"use client";
import ProjectCarousel from "./ProjectCarousel";

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="w-full max-w-7xl mx-auto flex flex-col items-stretch justify-center mt-17 md:mt-28 gap-8 px-4 md:px-8 md:text-lg"
    >
      <h1 data-reveal className="text-5xl md:text-6xl">
        projects
      </h1>

      <div data-reveal>
        <ProjectCarousel />
      </div>
    </section>
  );
}
