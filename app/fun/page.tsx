"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FunProjectCard from "@/app/components/FunProjectCard";

type FunProject = {
  title: string;
  tag: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderHeight?: number;
};

const FUN_COLUMNS: FunProject[][] = [
  [
    {
      title: "DFA BDD ‘25-26 Stickers",
      tag: "SPRING 2026",
      description:
        "Designing stickers for annual Bulldog Days event! I love stickers :)",
      imageSrc: "/images/fun/dfa-bdd-stickers.png",
      imageAlt: "DFA Bulldog Days sticker sheet in a plastic bag",
    },
    {
      title: "Yale Hunter",
      tag: "FALL 2025",
      description:
        "My final project for CPSC 1001, made with my friends Carmen, Eden, and Johnny!",
      imageSrc: "/images/fun/yale-hunter.png",
      imageAlt: "Pixel art Yale Hunter game screenshot",
    },
  ],
  [
    {
      title: "Push or Pull?",
      tag: "FALL 2025",
      description:
        "A zine for ART 1782 with a camera rented from Bass and frustrating InDesign",
      imageSrc: "/images/fun/push-or-pull.png",
      imageAlt: "Push or Pull zine spread in a binder",
    },
    {
      title: "Yale Supreme Court Advocacy Clinic",
      tag: "FALL 2025",
      description: "Facing my biggest fears of illustrations by making logos.",
      imageSrc: "/images/fun/yale-supreme-court.png",
      imageAlt: "Yale Supreme Court Advocacy Clinic logo with iguana",
    },
  ],
  [
    {
      title: "Yale Math Competitions",
      tag: "FALL 2025",
      description:
        "Another project for ART 1782 but I’m remaking a poster I found on the streets. (Sorry..)",
      placeholderHeight: 446,
    },
    {
      title: "Push or Pull?",
      tag: "FALL 2025",
      description:
        "A zine for ART 1782 with a camera rented from Bass and frustrating InDesign",
      placeholderHeight: 210,
    },
  ],
];

export default function Fun() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".fun-hero-title", {
        opacity: 0,
        filter: "blur(8px)",
        y: 24,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(".fun-hero-subtitle", {
        opacity: 0,
        filter: "blur(4px)",
        y: 16,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.from(".fun-card", {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.35,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen pt-[calc(5rem+5vh)] px-4 pb-10 lg:px-[6vw]"
    >
      <header className="flex flex-col gap-1 py-4">
        <h1
          className="fun-hero-title title-1 w-full"
          style={{ color: "var(--color-primary)" }}
        >
          I just be doing stuff as long as it&apos;s creative.
        </h1>
        <p
          className="fun-hero-subtitle max-w-[487px] text-[16px] tracking-[-0.8px]"
          style={{
            fontFamily: "var(--font-Alte-Haas-Grotesk)",
            color: "var(--color-accent)",
          }}
        >
          Featuring posters, zines, and even motion design work from high school
          and middle school :0
        </p>
      </header>

      <div className="flex flex-col gap-8 p-2.5 lg:flex-row lg:gap-8">
        {FUN_COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex min-w-0 flex-1 flex-col gap-8"
          >
            {column.map((project) => (
              <FunProjectCard
                key={`${columnIndex}-${project.title}-${project.tag}`}
                title={project.title}
                tag={project.tag}
                description={project.description}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                placeholderHeight={project.placeholderHeight}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
