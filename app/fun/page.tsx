"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import FunProjectCard from "@/app/components/FunProjectCard";

const Masonry = dynamic(
  () => import("masonic").then((mod) => ({ default: mod.Masonry })),
  { ssr: false },
) as unknown as typeof import("masonic").Masonry;

type FunProject = {
  title: string;
  tag: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderHeight?: number;
  href?: string;
};

const FUN_PROJECTS: FunProject[] = [
  {
    title: "DFA BDD ‘25-26 Stickers",
    tag: "SPRING 2026",
    description:
      "Designing stickers for the very event that introduced me to DFA!",
    imageSrc: "/images/fun/dfa-bdd-stickers.png",
    imageAlt: "DFA Bulldog Days sticker sheet in a plastic bag",
  },
  {
    title: "Push or Pull?",
    tag: "FALL 2025",
    description:
      "A zine for ART 1782 with a camera rented from Bass and frustrating InDesign",
    imageSrc: "/images/fun/push-or-pull.png",
    imageAlt: "Push or Pull zine spread in a binder",
  },
  {
    title: "Yale Math Competitions",
    tag: "FALL 2025",
    description: "Poster re-design for Yale Math Competitions for ART 1782",
    imageSrc: "/images/fun/yale-math-competitions.png",
    imageAlt: "Yale Math Competitions poster with graph paper splash design",
  },
  {
    title: "Yale Hunter",
    tag: "FALL 2025",
    description:
      "Final project for CPSC 1001, made with my friends Carmen, Eden, and Johnny!",
    imageSrc: "/images/fun/yale-hunter.png",
    imageAlt: "Pixel art Yale Hunter game screenshot",
    href: "https://github.com/helenhuangg/CPSC1001-Yale-Hunter",
  },
  {
    title: "Yale Supreme Court Advocacy Clinic",
    tag: "SPRING 2026",
    description: "Facing my biggest fears of illustrations by making logos.",
    imageSrc: "/images/fun/yale-supreme-court.png",
    imageAlt: "Yale Supreme Court Advocacy Clinic logo with iguana",
  },
  {
    title: "Elise's Website",
    tag: "SUMMER 2026",
    description: "Commission website designed and built for my friend Elise",
    imageSrc: "/images/fun/kyurinas.png",
    imageAlt: "Elise commission website hero with lace frame and social links",
    href: "https://virmiu.netlify.app/index.html",
  },
];

function useColumnCount() {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setColumns(1);
      else setColumns(3);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

export default function Fun() {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnCount = useColumnCount();

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
          className="fun-hero-title narrative-1 w-full"
          style={{ color: "var(--color-primary)" }}
        >
          <span className="drop-cap-inline">
            <span className="drop-cap-letter" aria-hidden="true">
              C
            </span>
            <span className="drop-cap-body">
              reative stuff I do, for whatever reason.
            </span>
          </span>
        </h1>
        <p className="fun-hero-subtitle text-left w-full">Work in Progress.</p>
      </header>

      <section className="w-full overflow-hidden pb-4 pt-2">
        <Masonry
          items={FUN_PROJECTS}
          columnCount={columnCount}
          columnGutter={16}
          rowGutter={16}
          // Scrolling happens inside #smooth-wrapper, not the window, so
          // masonic's viewport virtualization would never reveal later cards.
          overscanBy={Infinity}
          itemKey={(project, index) =>
            `${project.title}-${project.tag}-${index}`
          }
          render={({ data }) => (
            <FunProjectCard
              title={data.title}
              tag={data.tag}
              description={data.description}
              imageSrc={data.imageSrc}
              imageAlt={data.imageAlt}
              placeholderHeight={data.placeholderHeight}
              href={data.href}
            />
          )}
        />
      </section>
    </div>
  );
}
