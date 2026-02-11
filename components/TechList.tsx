import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import "@/components/TechList.css";
export default function TechList() {
  const techs = [
    { name: "Next.js", icon: "/nextjs-icon.svg", link: "https://nextjs.org/" },
    { name: "React", icon: "/react-js-icon.svg", link: "https://reactjs.org/" },
    { name: "Vercel", icon: "/vercel-icon.svg", link: "https://vercel.com/" },
    {
      name: "TailwindCSS",
      icon: "/tailwind-css-icon.svg",
      link: "https://tailwindcss.com/",
    },
    { name: "Node.js", icon: "/node-js-icon.svg", link: "https://nodejs.org/" },
    { name: "NeonDB", icon: "/neon-icon.svg", link: "https://neon.tech/" },
  ];

  return (
    <TooltipProvider>
      <div
        id="tech-container"
        className="flex justify-center items-center gap-4 transition scale-in-center ease-in-out"

      >
        {techs.map((tech, i) => (
          <Tooltip key={tech.name}>
            <TooltipTrigger asChild>
              <a href={tech.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={tech.icon}
                  alt={`${tech.name} icon`}
                  className="w-10 hover:scale-120  transition scale-in-center ease-in-out"
                  style={
                    { "--delay": `${0.1 * (i + 1)}s` } as React.CSSProperties
                  }
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>{tech.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
