"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollPlayVideo from "@/app/components/ScrollPlayVideo";

// Safari is the only engine that reads alpha from HEVC, and it's the only one
// that claims video/quicktime — so it takes the first source and everything
// else falls through to the VP9 alpha WebM.
const ABOUT_VIDEO_SOURCES = [
  { src: "/videos/about-me-alpha.mov", type: 'video/quicktime; codecs="hvc1"' },
  { src: "/videos/about-me.webm", type: "video/webm" },
  { src: "/videos/about-me.mp4", type: "video/mp4" },
];

const ORGS = [
  {
    name: "Yale Computer Society",
    logo: "/images/orgs/yale-computer-society.png",
    site: "yalecomputersociety.org",
    href: "https://yalecomputersociety.org/",
    role: "Director of Design",
    dates: "May 2025 - present",
  },
  {
    name: "Design at Yale",
    logo: "/images/orgs/design-at-yale.png",
    site: "designatyale.com",
    href: "https://designatyale.com",
    role: "Co-head of Studios",
    dates: "Sep 2025 - present",
  },
  {
    name: "DFA Yale",
    logo: "/images/orgs/dfa-yale.png",
    site: "dfayale.org",
    href: "https://dfayale.org",
    role: "Publicity & Design Board",
    dates: "Sep 2025 - present",
  },
  {
    name: "Student Technology Collaborative",
    logo: "/images/orgs/student-technology-collaborative.png",
    site: "studenttechnology.yale.edu",
    href: "https://studenttechnology.yale.edu",
    role: "Studios Designer",
    dates: "Jan 2026 - present",
  },
  {
    name: "YHack",
    logo: "/images/orgs/yhack.png",
    site: "yhack.org",
    href: "https://yhack.org",
    role: "Lead Designer",
    dates: "Dec 2025 - Feb 2026",
  },
];

const FIND_ME = [
  {
    label: "email",
    value: "helen.huang@yale.edu",
    href: "mailto:helen.huang@yale.edu",
  },
  {
    label: "linkedin",
    value: "hailuen",
    href: "https://www.linkedin.com/in/hailuen",
  },
  {
    label: "github",
    value: "helenhuangg",
    href: "https://www.github.com/helenhuangg",
  },
  {
    label: "resume",
    value: "→",
    href: "https://drive.google.com/file/d/15W1KgXSmgshSexg-WWLzFOE5tVucscPn/view",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-title", {
        opacity: 0,
        filter: "blur(8px)",
        y: 24,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(".about-subtitle", {
        opacity: 0,
        filter: "blur(4px)",
        y: 16,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.from(".about-video", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        delay: 0.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      <div
        ref={containerRef}
        className="w-full pt-[calc(5rem+5vh)] pb-[10vh] px-4 lg:px-[6vw] flex flex-col items-start"
      >
        <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-stretch lg:gap-10">
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <h1
                className="about-title narrative-1 w-full"
                style={{ color: "var(--color-primary)" }}
              >
                <span className="drop-cap-inline">
                  <span className="drop-cap-letter" aria-hidden="true">
                    H
                  </span>
                  <span className="drop-cap-body">ey there! I'm Helen.</span>
                </span>
              </h1>
              <p className="about-subtitle text-left w-full">
                Currently studying abroad @{" "}
                <span className="subtitle-emphasis">Sogang</span>. Incoming
                Sophomore @ <span className="subtitle-emphasis">Yale</span>.
              </p>
            </div>

            <ScrollPlayVideo
              sources={ABOUT_VIDEO_SOURCES}
              className="about-video mx-auto w-full object-contain sm:max-w-[24rem] lg:hidden"
            />

            <p className="text-[var(--color-primary)]">
              I’m an interdisciplinary designer with a ton of love for motion
              graphics, storytelling, and design engineering. Currently in my
              second year studying Computing and the Arts @ Yale University.
            </p>
            <p className="text-[var(--color-primary)]">
              Ever since I was little, I’ve been involved in design-adjacent
              communities and participating in making things to see people
              smile. I enjoy creating products to enhance lives and
              understanding how people, tech, and art can make an impact.
            </p>
            <p className="text-[var(--color-primary)]">
              When I’m not on my 15 hour Figma streak you can find me getting
              boba with friends and taking pictures of anything and everything.
            </p>
          </div>

          <ScrollPlayVideo
            sources={ABOUT_VIDEO_SOURCES}
            className="about-video hidden shrink-0 object-contain lg:block lg:h-auto lg:w-auto lg:max-w-[45%] lg:self-stretch"
          />
        </div>
      </div>

      <section
        className="flex w-full items-center justify-center px-4 py-24 sm:px-[6vw] sm:py-32 lg:px-[9vw] lg:py-[12rem]"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-background) 0%, #7b8288 27.8%, var(--color-primary) 79.5%)",
        }}
      >
        <div className="flex w-full flex-col gap-14 lg:flex-row lg:gap-4">
          <div className="flex flex-1 flex-col gap-7">
            <h2
              className="text-[32px] tracking-[-1.6px] font-[family-name:var(--font-hw-cigars)]"
              style={{ color: "var(--color-background)" }}
            >
              Orgs{" "}
              <span className="font-[family-name:var(--font-eb-garamond)]">
                &amp;
              </span>{" "}
              Involvement
            </h2>

            <div className="flex flex-col gap-[21px]">
              {ORGS.map((org) => (
                <div
                  key={org.name}
                  className="flex w-full items-center justify-between gap-6"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <span className="size-[19px] shrink-0 overflow-hidden">
                        <img
                          src={org.logo}
                          alt={`${org.name} logo`}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span
                        className="text-[16px] tracking-[-0.8px] font-[family-name:var(--font-Alte-Haas-Grotesk)]"
                        style={{ color: "var(--color-background)" }}
                      >
                        {org.name}
                      </span>
                    </div>
                    <a
                      href={org.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] tracking-[-0.8px] font-[family-name:var(--font-Alte-Haas-Grotesk)] transition-opacity hover:opacity-70"
                      style={{ color: "var(--color-highlight)" }}
                    >
                      {org.site}
                    </a>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                    <span
                      className="text-[16px] tracking-[-0.8px] font-[family-name:var(--font-Alte-Haas-Grotesk)]"
                      style={{ color: "var(--color-background)" }}
                    >
                      {org.role}
                    </span>
                    <span
                      className="text-[16px] tracking-[-0.8px] font-[family-name:var(--font-Alte-Haas-Grotesk)]"
                      style={{ color: "var(--color-highlight)" }}
                    >
                      {org.dates}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-7">
            <h2
              className="text-[32px] tracking-[-1.6px] font-[family-name:var(--font-hw-cigars)]"
              style={{ color: "var(--color-background)" }}
            >
              Find me
            </h2>

            {FIND_ME.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between gap-6 transition-opacity hover:opacity-70"
              >
                <span
                  className="text-[16px] tracking-[-0.8px] font-[family-name:var(--font-Alte-Haas-Grotesk)]"
                  style={{ color: "var(--color-highlight)" }}
                >
                  {link.label}
                </span>
                <span
                  className="text-[16px] tracking-[-0.8px] font-[family-name:var(--font-Alte-Haas-Grotesk)]"
                  style={{ color: "var(--color-background)" }}
                >
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
