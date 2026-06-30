"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { projects } from "./projectsData";
import ProjectModal from "./ProjectModal";

interface Ctx {
  openProject: (slug: string) => void;
}

const ProjectModalCtx = createContext<Ctx | null>(null);

export function useProjectModal() {
  const ctx = useContext(ProjectModalCtx);
  if (!ctx)
    throw new Error("useProjectModal must be used within ProjectModalProvider");
  return ctx;
}

export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = projects.find((p) => p.slug === activeSlug) ?? null;

  return (
    <ProjectModalCtx.Provider value={{ openProject: setActiveSlug }}>
      {children}
      {active && (
        <ProjectModal project={active} onClose={() => setActiveSlug(null)} />
      )}
    </ProjectModalCtx.Provider>
  );
}
