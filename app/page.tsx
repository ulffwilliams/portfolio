"use client";
import Name from "../components/Name";
import Buttons from "@/components/Buttons";
import Socials from "@/components/Socials";
import SmoothWrapper from "@/components/SmoothWrapper";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import Portrait from "@/components/Portrait";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";
import { ProjectModalProvider } from "@/components/ProjectModalContext";
import ProjectLink from "@/components/ProjectLink";
import RotatingWord from "@/components/RotatingWord";
import Magnetic from "@/components/Magnetic";
import ScrollReveal from "@/components/ScrollReveal";
import IntroLoader from "@/components/IntroLoader";
import { Color } from "three";

export default function Home() {
  const [toggle, setToggle] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SmoothWrapper>
      <ProjectModalProvider>
        <IntroLoader />
        <ScrollReveal />
        <div className="flex justify-start flex-col bg-blue-50">
          <nav
            data-intro
            className="w-full border-b-4 h-19 sticky top-0 z-50 flex justify-between items-center px-5 md:px-10 lg:px-16 anchor/nav-anchor bg-white"
          >
            <h2 className="text-xl">William Ulff</h2>

            {/* Desktop links */}
            <div className="hidden md:flex gap-8 lg:gap-12 font-bold text-l">
              <Magnetic strength={0.5}>
                <a href="#about" className="hover:underline">
                  about me
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a href="#work" className="hover:underline">
                  projects
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a href="#contact" className="hover:underline">
                  contact
                </a>
              </Magnetic>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-black transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-black transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-black transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </nav>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="md:hidden flex flex-col border-b-4 top-20 bg-white w-full h-41 absolute uppercase anchored/nav-anchor">
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="font-bold border-b-2 w-4/5 h-10 flex items-center justify-start ml-5"
              >
                About
              </a>
              <a
                href="#work"
                onClick={() => setMenuOpen(false)}
                className="font-bold border-b-2 w-4/5 h-12 flex items-center justify-start ml-5"
              >
                Work
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="font-bold border-b-2 w-4/5 h-12 flex items-center justify-start ml-5"
              >
                Contact
              </a>
            </div>
          )}

          <section className="flex items-center justify-center px-5 min-h-screen">
            <div className="w-full max-w-7xl flex flex-col items-start gap-8 border-b-4 pb-10 md:pb-20">
              <p
                data-intro
                className="text-4xl md:text-7xl lg:text-8xl tracking-wide font-thin max-w-6xl md:leading-tight"
              >
                Hello. My name is William, I&apos;m a{" "}
                <RotatingWord
                  words={[
                    "artist",
                    "developer",
                    "designer",
                    "problem-solver",
                    "builder",
                    "tinkerer",
                    "musician",
                    "thinker",
                    "do:er",
                    "dreamer",
                    "creator",
                    "nice guy",
                    "curious guy",
                    "explorer",
                    "frontend-guy",
                    "backend-guy",
                  ]}
                />
                . Nice to meet you!
              </p>
              <div
                data-intro
                className="flex flex-col sm:flex-row gap-5 mt-4 text-lg md:text-xl"
              >
                <Magnetic strength={0.3}>
                  <a
                    href="#work"
                    className="block border p-4 md:px-10 md:py-5 text-white uppercase text-center hover:bg-white transition"
                  >
                    Things i've done
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href="#contact"
                    className="block border-2 p-4 md:px-10 md:py-5 uppercase text-center hover:bg-white hover:text-white transition"
                  >
                    contact
                  </a>
                </Magnetic>
              </div>
            </div>
          </section>

          <section
            id="about"
            className="w-full max-w-7xl mx-auto flex flex-col items-stretch justify-center border-b-4 mt-17 md:mt-28 gap-8 px-4 md:px-8 pb-8 md:pb-20 md:text-lg"
          >
            <h1 data-reveal className="text-5xl md:text-6xl">
              about me
            </h1>

            <div data-reveal className="grid md:grid-cols-2 gap-8 items-start">
              <Portrait />

              <article className="flex flex-col gap-6 w-full border-4 p-8 md:h-full md:justify-center">
                <h2 className="text-2xl md:text-3xl">who I am</h2>
                <p className="font-thin">
                  My name is William. I am a web/system developer from Sweden. I
                  like building web apps from start to finish, taking an idea
                  and turning it into something people can actually use. I like
                  thinking about how something should look, how it should feel
                  to use, and then figuring out how to build it. I usually end
                  up working on a bit of everything, from planning features and
                  designing interfaces to writing the frontend, backend, and
                  getting everything deployed.
                </p>
                <p className="font-thin">
                  Nowadays I spend most of my time with Next.js and cloud
                  services, but I'm always happy to pick up whatever fits the
                  project best (<a href="#skills">tech-skills here!!</a>). I'm
                  definitely more drawn to frontend work and design, but I enjoy
                  backend development too. Having experience with both means I
                  can build complete applications without getting stuck on one
                  part of the stack. At the end of the day, I just like making
                  things that are enjoyable to use and solving interesting
                  problems along the way.
                </p>
                <h2>Current thought:</h2>
                <p className="font-thin">
                  Web design is in a weird place right now. AI can make really
                  good-looking websites in a matter of seconds. Things that
                  would've taken someone hours to design and build suddenly
                  aren't that hard anymore. I've been thinking a lot about what
                  that means. What makes a website actually feel like it was
                  made by someone? Is it the imperfections? The little details?
                  The decisions that don't have an obvious reason? How do we
                  distribute the feeling of authentic artistry in this
                  landscape? I don't really know. But we should try!
                </p>
              </article>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <article
                data-reveal
                className="flex flex-col gap-4 w-full border-4 p-8"
              >
                <h2 id="skills" className="text-2xl md:text-3xl">
                  technical skills
                </h2>
                <ul className="font-thin tracking-wide grid grid-cols-2 gap-2 list-disc list-inside">
                  <li>Next.js</li>
                  <li>Node.js</li>
                  <li>Tailwind CSS</li>
                  <li>React</li>
                  <li>JavaScript</li>
                  <li>TypeScript</li>
                  <li>Angular</li>
                  <li>CSS</li>
                  <li>SQL</li>
                  <li>Git</li>
                  <li>jQuery</li>
                  <li>Wordpress/PHP</li>
                  <li>Cloud services like Cloudflare, Supabase etc</li>
                  <li>Vercel/Github-pages</li>
                  <li>Mailchimp integrations, Resend, Web3Forms</li>
                </ul>
              </article>

              <article
                data-reveal
                className="flex flex-col gap-5 w-full border-4 p-8"
              >
                <h2 className="text-2xl md:text-3xl">experience</h2>

                <div>
                  <h3 className="text-lg">Web/System Developer</h3>
                  <p className="font-thin text-xs">
                    Svenska Affärskoncept AB, May 2025 - now
                  </p>
                  <p className="font-thin">
                    Development and maintenance of a full internal database CRM
                    for one of our affiliated organizations.{" "}
                    <ProjectLink slug="skoldatabasen">
                      Read more here!
                    </ProjectLink>
                  </p>
                  <br />
                  <p className="font-thin">
                    Development of a browser-based learning platform for one of
                    our affiliated organizations. The platform is maintained as
                    a live-service product and is used by thousands of students
                    and teachers as part of their daily education.{" "}
                    <ProjectLink slug="bondgarden">Read about it.</ProjectLink>
                  </p>
                  <br />
                  <p className="font-thin">
                    I also maintain and co-develop websites for all of our
                    affiliated partners, usually through Wordpress.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg">Internship, Web-developement</h3>
                  <p className="font-thin text-xs">
                    Svenska Affärskoncept AB, Nov 2024 - May 2025
                  </p>
                  <p className="font-thin">
                    Started development of the{" "}
                    <ProjectLink slug="bondgarden">
                      learning platform
                    </ProjectLink>
                    .
                  </p>
                  <br />
                  <p className="font-thin">
                    Also got tasked with updating one of our affiliates webpage,
                    to increase performance, accessibility and responsive
                    design. This was done using Wordpress/PHP.
                  </p>
                  <br />
                  <p className="font-thin">
                    During this time, I was also an active member of the
                    communications team, collaborating on decisions regarding
                    social media, newsletters, and broader communication
                    initiatives.
                  </p>
                </div>
              </article>
            </div>
          </section>
          <ProjectsSection />

          <section
            id="contact"
            className="w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-center px-4 md:px-8 py-16"
          >
            <div
              data-reveal
              className="grid md:grid-cols-2 border-4 shadow-xl overflow-hidden"
            >
              {/* Left — dark info panel */}
              <div className="bg-gray-950 text-white flex flex-col justify-between gap-12 p-10 md:p-16">
                <div className="flex flex-col gap-4">
                  <h3 className="text-5xl md:text-7xl uppercase leading-tight">
                    Get in touch
                  </h3>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <p className="uppercase text-sm tracking-widest">
                      Find me on
                    </p>
                    <div className="flex gap-5">
                      <a
                        href="https://github.com/ulffwilliams"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="group inline-flex p-3 border-2 border-transparent rounded-md transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:-rotate-6 hover:border-white hover:bg-white/10 active:scale-95"
                      >
                        <span
                          aria-hidden
                          className="h-14 w-14 bg-white transition-colors duration-200 group-hover:bg-[var(--chart-2)] [mask:url(/github-icon.svg)_center/contain_no-repeat] [-webkit-mask:url(/github-icon.svg)_center/contain_no-repeat]"
                        />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/william-ulff-12325923a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="group inline-flex p-3 border-2 border-transparent rounded-md transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 hover:rotate-6 hover:border-white hover:bg-white/10 active:scale-95"
                      >
                        <span
                          aria-hidden
                          className="h-14 w-14 bg-white transition-colors duration-200 group-hover:bg-[var(--chart-2)] [mask:url(/linkedin-icon.svg)_center/contain_no-repeat] [-webkit-mask:url(/linkedin-icon.svg)_center/contain_no-repeat]"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — form panel */}
              <div className="bg-white p-10 md:p-16 flex flex-col justify-center">
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </ProjectModalProvider>
    </SmoothWrapper>
  );
}
