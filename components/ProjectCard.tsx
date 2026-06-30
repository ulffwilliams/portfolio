"use client";
import { ArrowUpRight } from "lucide-react";
import { Project } from "./projectsData";

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-8">
      <button
        onClick={onOpen}
        aria-label={`Open ${project.title} details`}
        className="group relative block w-full overflow-hidden border-4 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-black"
      >
        <img
          src={project.cover}
          alt={project.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover preview overlay */}
        <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-black/75 p-6 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
          <span className="inline-flex items-center gap-1 text-white uppercase text-sm font-bold">
            {project.title} <ArrowUpRight className="h-5 w-5" />
          </span>
          <p className="text-white font-thin text-base">{project.preview}</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border border-white/60 text-white text-sm px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="border border-white/60 text-white text-sm px-2 py-0.5">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </button>
    </article>
  );
}
