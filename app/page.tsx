"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePreloader } from "./components/PreloaderContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProjectCard from "./components/projectCard";
import useSfx from "./components/useSfx";
import Preloader from "./components/preloader";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import findMe from "./components/FindMe.module.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "YHack 2026",
    description: "Designing a hackathon site worth falling for.",
    badge: "0 → 1 Design",
    tags: ["Product"],
    image: "/images/yhack1.png",
    hoverImage: "/images/yhack2.png",
    href: "/work/yhack",
    size: "large" as const,
  },
  {
    title: "Libra: Your Balance but Better",
    description:
      "What if your phone could show you how steady you are in real time?",
    badge: "FigBuild 2026",
    tags: ["Product"],
    image: "/images/libra1.png",
    hoverImage: "/images/libra_thumbnail.png",
    href: "/work/libra",
    size: "small" as const,
  },
  {
    title: "YaleClubs",
    description:
      "Helping Yale students go from discovering a club to showing up for their first meeting.",
    badge: "Redesign",
    tags: ["Product"],
    image: "/images/yale-clubs.png",
    href: "/work/yale-clubs",
    comingSoon: true,
    size: "large" as const,
  },
  {
    title: "Adobe",
    description: "Coming Soon.",
    badge: "2026",
    tags: ["Product"],
    image: "/images/adobe.png",
    href: "/work/adobe",
    comingSoon: true,
    size: "small" as const,
  },
  {
    title: "Bulldog Dispatch",
    description: "Motion brand identity and graphics for a high school broadcast.",
    badge: "Motion",
    tags: ["motion"],
    image: "/images/bd1.png",
    hoverImage: "/images/bd2.png",
    href: "/work/bulldog-dispatch",
    size: "large" as const,
  },
  {
    title: "Spotify",
    description: "A brand commercial for Student Television Network.",
    badge: "Motion",
    tags: ["motion"],
    image: "/images/spotify1.png",
    hoverImage: "/images/spotify2.png",
    href: "/work/spotify",
    size: "small" as const,
  },
];

const FIND_ME = [
  { label: "Linkedin", href: "https://www.linkedin.com/in/hailuen" },
  { label: "GitHub", href: "https://www.github.com/helenhuangg" },
  {
    label: "Resume",
    href: "/Helen_Huang_Resume.pdf",
    arrow: true,
  },
];

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 12 12" className={className} aria-hidden>
    <path d="M3 9L9 3" />
    <path d="M4.25 3H9V7.75" />
  </svg>
);

const Home = () => {
  const { hasShown, markShown } = usePreloader();
  const [loading, setLoading] = useState(!hasShown);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [hoverCol, setHoverCol] = useState<"left" | "right" | null>(null);
  const playSelectSfx = useSfx("/audio/select.mp3");
  const visibleProjects = projects.filter((project) =>
    project.tags.some((tag) => tag.toLowerCase() === "product"),
  );
  const leftProjects = visibleProjects.filter((_, index) => index % 2 === 0);
  const rightProjects = visibleProjects.filter((_, index) => index % 2 === 1);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const sectionId =
      searchParams.get("scrollTo") ||
      sessionStorage.getItem("scrollToSection") ||
      (sessionStorage.getItem("scrollToWork") ? "work" : null);
    if (!sectionId) return;

    sessionStorage.removeItem("scrollToSection");
    sessionStorage.removeItem("scrollToWork");

    const { ScrollSmoother } = require("gsap/ScrollSmoother");

    const scrollToEl = () => {
      const smoother = ScrollSmoother.get();
      const el = document.getElementById(sectionId);
      if (el) {
        if (smoother) {
          smoother.scrollTo(el, false);
        } else {
          const wrapper = document.getElementById("smooth-wrapper");
          if (wrapper) {
            const y = el.getBoundingClientRect().top + wrapper.scrollTop - 80;
            wrapper.scrollTo({ top: y, behavior: "smooth" });
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        if (searchParams.get("scrollTo")) {
          setTimeout(() => window.history.replaceState(null, "", "/"), 1200);
        }
        return true;
      }
      return false;
    };

    let interval: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      if (!scrollToEl()) {
        interval = setInterval(() => {
          if (scrollToEl() && interval) {
            clearInterval(interval);
          }
        }, 50);
      }
    }, 200);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [loading, searchParams, router]);

  useGSAP(() => {
    if (loading) {
      gsap.set(heroBgRef.current, { scale: 0.92 });
      return;
    }

    const cards = gsap.utils
      .toArray<HTMLElement>(".project-card")
      .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));

    const heroDuration = 1.2;
    if (cards.length > 0) {
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        delay: heroDuration,
      });
    }

    gsap.from(".hero-signature", {
      opacity: 0,
      filter: "blur(8px)",
      y: 20,
      duration: 0.7,
      ease: "power2.out",
    });

    gsap.from(".hero-fade", {
      opacity: 0,
      filter: "blur(4px)",
      y: 16,
      duration: 0.5,
      delay: 0.45,
      stagger: 0.12,
      ease: "power2.out",
    });

  }, [loading]);

  return (
    <>
      {loading && (
        <Preloader
          onComplete={() => {
            markShown();
            setLoading(false);
          }}
        />
      )}
      <div
        className={`transition-opacity duration-500 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div
          ref={heroBgRef}
          className="hero-bg flex w-full flex-col px-6 lg:px-[min(215px,15vw)]"
        >
          <section className="flex w-full flex-col gap-10 pt-[154px] pb-12 lg:flex-row lg:items-start lg:justify-between lg:pb-16">
            <div className="flex w-full max-w-[517px] flex-col gap-4">
              <img
                src="/images/home/helen-signature.png"
                alt="Helen Huang"
                className="hero-signature h-auto w-full max-w-[400px]"
              />
              <p className="hero-bio hero-fade">
                is a product designer making everyday experiences feel welcoming
                and easy to use, from thoughtful{" "}
                <span className="hero-bio-em">systems</span> to expressive,
                motion-driven <span className="hero-bio-em">interactions</span>.
              </p>
              <p className="hero-bio hero-fade">
                Currently, studying computer science & design @{" "}
                <span className="hero-bio-em-soft">Yale</span> and campus leader
                @ <span className="hero-bio-em">Figma</span>
              </p>
            </div>

            <div className="hero-fade flex flex-col items-start gap-2 lg:mt-[108px] lg:items-end">
              <p className="find-me-label">Find me</p>
              <div className="flex flex-col items-start gap-1 lg:items-end">
                {FIND_ME.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`find-me-link ${findMe.link}`}
                    onClick={playSelectSfx}
                  >
                    {!item.arrow && (
                      <span className={findMe.dash} aria-hidden>
                        <svg viewBox="0 0 12 4">
                          <path d="M1 2H11" pathLength="1" />
                        </svg>
                      </span>
                    )}
                    <span className={item.arrow ? undefined : findMe.label}>
                      {item.label}
                    </span>
                    {item.arrow && (
                      <span className={findMe.arrow} aria-hidden>
                        <ArrowIcon className={findMe.arrowOut} />
                        <ArrowIcon className={findMe.arrowIn} />
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="work" className="flex w-full flex-col pb-8">
            <div
              className="flex min-w-0 flex-1 flex-col gap-10 lg:flex-row lg:gap-4"
              onMouseLeave={() => setHoverCol(null)}
            >
              <div
                className="flex min-w-0 flex-col gap-8"
                style={{
                  flex:
                    hoverCol === "left"
                      ? "1.1 1 0%"
                      : hoverCol === "right"
                        ? "0.9 1 0%"
                        : "1 1 0%",
                  transition: "flex 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={() => {
                  if (window.matchMedia("(min-width: 1024px)").matches) {
                    setHoverCol("left");
                  }
                }}
              >
                {leftProjects.map((project, index) => (
                  <ProjectCard key={project.href} {...project} index={index} />
                ))}
              </div>
              <div
                className="flex min-w-0 flex-col gap-8"
                style={{
                  flex:
                    hoverCol === "right"
                      ? "1.1 1 0%"
                      : hoverCol === "left"
                        ? "0.9 1 0%"
                        : "1 1 0%",
                  transition: "flex 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={() => {
                  if (window.matchMedia("(min-width: 1024px)").matches) {
                    setHoverCol("right");
                  }
                }}
              >
                {rightProjects.map((project, index) => (
                  <ProjectCard
                    key={project.href}
                    {...project}
                    index={index + leftProjects.length}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Home />
    </Suspense>
  );
}
