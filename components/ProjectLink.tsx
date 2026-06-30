"use client";
import { ReactNode } from "react";
import { useProjectModal } from "./ProjectModalContext";

interface ProjectLinkProps {
  slug: string;
  children: ReactNode;
}

export default function ProjectLink({ slug, children }: ProjectLinkProps) {
  const { openProject } = useProjectModal();

  return (
    <button
      type="button"
      onClick={() => openProject(slug)}
      className="text-chart-2 underline hover:opacity-70 transition cursor-pointer"
    >
      {children}
    </button>
  );
}
