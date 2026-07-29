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
    <div
      ref={containerRef}
      className="w-full min-h-screen pt-[calc(5rem+5vh)] px-4 lg:px-[6vw] flex flex-col items-start"
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
            className="about-video w-full object-contain sm:max-w-[24rem] lg:hidden"
          />

          <p className="text-[var(--color-primary)]">
            I’m an interdisciplinary designer with a ton of love for motion
            graphics, storytelling, and design engineering. Currently in my
            second year studying Computing and the Arts @ Yale University.
          </p>
          <p className="text-[var(--color-primary)]">
            Ever since I was little, I’ve been involved in design-adjacent
            communities and participating in making things to see people smile.
            I enjoy creating products to enhance lives and understanding how
            people, tech, and art can make an impact.
          </p>
          <p className="text-[var(--color-primary)]">
            When I’m not on my 15 hour Figma streak you can find me getting boba
            with friends and taking pictures of anything and everything.
          </p>
        </div>

        <ScrollPlayVideo
          sources={ABOUT_VIDEO_SOURCES}
          className="about-video hidden shrink-0 object-contain lg:block lg:h-auto lg:w-auto lg:max-w-[45%] lg:self-stretch"
        />
      </div>
    </div>
  );
}
