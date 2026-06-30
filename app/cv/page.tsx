"use client";
import { projects } from "@/components/projectsData";

const SKILLS: { label: string; items: string }[] = [
  {
    label: "Languages",
    items: "TypeScript, JavaScript, HTML5, CSS3, SQL, PHP",
  },
  { label: "Frontend", items: "React, Next.js, Tailwind CSS, Angular, jQuery" },
  {
    label: "Backend",
    items: "Node.js, REST APIs, SSR, Authentication, Database design",
  },
  { label: "Databases", items: "PostgreSQL, SQL Server, Supabase" },
  {
    label: "Cloud & DevOps",
    items: "Vercel, Cloudflare, GitHub, Git, GitHub Actions",
  },
  {
    label: "Other",
    items: "WordPress, Mailchimp, Resend, Web3Forms, Responsive, UI/UX",
  },
];

// Pulled from the website's experience section.
const EXPERIENCE = [
  {
    role: "Web / System Developer",
    org: "Svenska Affärskoncept AB",
    period: "May 2025 — Present",
    summary: "",
    points: [
      "Develop and maintain a full internal database CRM for an affiliated organization.",
      "Develop a browser-based learning platform - a live-service product used by thousands of students and teachers daily.",
      "Maintain and co-develop websites for affiliated partners.",
    ],
  },
  {
    role: "Internship, Web Development",
    org: "Svenska Affärskoncept AB",
    period: "Nov 2024 — May 2025",
    summary: "",
    points: [
      "Started development of the learning platform.",
      "Rebuilt an affiliate's site for performance, accessibility and responsive design (WordPress/PHP).",
      "Active in the communications team with focus on social media, newsletters, comms strategy.",
    ],
  },
];

export default function CV() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center gap-6 py-10 px-4 print:bg-white print:p-0 print:min-h-0 print:gap-0">
      {/* Toolbar — hidden in print */}
      <div className="print:hidden flex gap-4 items-center">
        <button
          onClick={() => window.print()}
          className="border-4 bg-gray-950 text-white uppercase font-bold px-6 py-3 hover:bg-gray-700 transition"
        >
          Print / Save as PDF
        </button>
        <a
          href="/"
          className="border-4 uppercase font-bold px-6 py-3 hover:bg-gray-950 hover:text-white transition text-black! no-underline"
        >
          ← Back
        </a>
      </div>

      {/* A4 sheet */}
      <div className="cv-sheet bg-white border-4 shadow-xl flex flex-col text-[11.5px] leading-snug">
        {/* Header band */}
        <header className="bg-gray-950 text-white px-8 py-5 flex justify-between items-start shrink-0">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-4xl uppercase leading-none tracking-wide">
              William Ulff
            </h1>
            <p className="text-base font-thin">
              Fullstack Web Developer{" "}
              <span className="text-chart-2">— Örebro, Sweden</span>
            </p>
          </div>
          <div className="text-right text-[10px] font-thin flex flex-col gap-0.5 pt-1">
            <span>www.ulffwilliams.se</span>
            <span>github.com/ulffwilliams</span>
            <span>linkedin.com/in/william-ulff</span>
          </div>
        </header>

        {/* Body — two columns */}
        <div className="flex flex-1 min-h-0">
          {/* Left column */}
          <aside className="w-[35%] border-r-4 p-6 flex flex-col gap-4">
            <Section title="Profile">
              <p className="font-thin">
                Fullstack web developer who builds complete digital products
                from the ground up, with my heart and focus on the frontend.
              </p>
              <p className="font-thin mt-1.5">
                I'm currently looking for an engaging role in web development
                where I can continue learning, take on new challenges, and
                contribute to building high-quality digital products alongside a
                great team.
              </p>
            </Section>

            <div className="w-full border-4 aspect-square overflow-hidden">
              <img
                src="me.JPEG"
                alt="William Ulff"
                className="w-full h-full object-cover"
              />
            </div>

            <Section title="Education">
              <div className="flex justify-between items-baseline gap-2">
                <p className="font-bold">EC Utbildning</p>
                <span className="text-[9px] uppercase text-gray-500 whitespace-nowrap">
                  Sep 2023 — Jun 2025
                </span>
              </div>
              <p className="font-thin">
                Higher Vocational Education Diploma, Front-end Development
              </p>

              <div className="flex justify-between items-baseline gap-2 mt-1.5">
                <p className="font-bold">Örebro universitet</p>
                <span className="text-[9px] uppercase text-gray-500 whitespace-nowrap">
                  Aug 2020 — Jun 2023
                </span>
              </div>
              <p className="font-thin">
                Bachelor&apos;s Degree, Music, Culture and Media
              </p>
            </Section>

            <Section title="Languages">
              <p className="font-thin">Swedish — Native</p>
              <p className="font-thin">English — Professional proficiency</p>
            </Section>
          </aside>

          {/* Right column */}
          <main className="w-[65%] p-6 flex flex-col gap-4">
            <Section title="Technical Skills">
              <div className="flex flex-col gap-1">
                {SKILLS.map((g) => (
                  <div key={g.label} className="flex gap-2">
                    <span className="font-bold uppercase w-28 shrink-0 text-[10px] pt-px">
                      {g.label}
                    </span>
                    <span className="font-thin">{g.items}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Professional Experience">
              <div className="flex flex-col gap-3">
                {EXPERIENCE.map((job) => (
                  <div key={job.role} className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-baseline gap-3">
                      <h3 className="text-[13px] font-bold">{job.role}</h3>
                      {job.period && (
                        <span className="text-[10px] uppercase text-gray-500 whitespace-nowrap">
                          {job.period}
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] uppercase text-gray-600">
                      {job.org}
                    </p>
                    <p className="font-thin mt-0.5">{job.summary}</p>
                    {job.points.length > 0 && (
                      <ul className="flex flex-col gap-0.5 mt-1">
                        {job.points.map((p, i) => (
                          <li key={i} className="flex gap-1.5 font-thin">
                            <span className="text-chart-2">—</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Selected Projects">
              <div className="flex flex-col gap-2.5">
                {projects.map((proj) => (
                  <div key={proj.slug} className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-baseline gap-3">
                      <h3 className="text-[13px] font-bold">{proj.title}</h3>
                      {proj.year && (
                        <span className="text-[10px] uppercase text-gray-500 whitespace-nowrap">
                          {proj.year}
                        </span>
                      )}
                    </div>
                    <p className="font-thin">{proj.preview}</p>
                    <p className="font-thin text-gray-600">
                      {proj.tags.join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </main>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-1">
      <h2 className="text-base uppercase border-b-2 border-black pb-0.5 font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}
