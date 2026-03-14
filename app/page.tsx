"use client";

import React, { useRef, useState, useEffect } from "react";
import { usePreloader } from "./components/PreloaderContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import ProjectCard from "./components/projectCard";
import { Magnetic } from "@/components/animate-ui/primitives/effects/magnetic";
import dynamic from "next/dynamic";

const Masonry = dynamic(
  () => import("masonic").then((mod) => ({ default: mod.Masonry })),
  { ssr: false }
) as unknown as typeof import("masonic").Masonry;
import Preloader from "./components/preloader";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "YHack",
    description: "Designing a Hackathon Worth Faling For",
    tags: ["0 -> 1 Design"],
    image: "images/yhack1.png",
    hoverImage: "images/yhack2.png",
    href: "/work/yhack",
  },
  {
    title: "Spotify",
    description: "Spotify Motion Brand Commercial",
    tags: ["motion"],
    image: "/images/spotify1.png",
    hoverImage: "/images/spotify2.png",
    href: "/work/spotify",
  },
  {
    title: "Bulldog Dispatch",
    description: "Motion Brand Identiy and Graphics",
    tags: ["motion"],
    image: "/images/bd1.png",
    hoverImage: "/images/bd2.png",
    href: "/work/bulldog-dispatch",
  },
];

const Divider = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1"
    height="100%"
    viewBox="0 0 1 12"
    fill="none"
    preserveAspectRatio="none"
  >
    <path className="divider-line" d="M0.5 0V12" stroke="#778BA4" />
  </svg>
);

function useColumnCount() {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setColumns(1);
      else setColumns(2);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
}

const Home = () => {
  const { hasShown, markShown } = usePreloader();
  const [loading, setLoading] = useState(!hasShown);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const columnCount = useColumnCount();

  useEffect(() => {
    if (loading) return;
    if (!sessionStorage.getItem("scrollToWork")) return;
    sessionStorage.removeItem("scrollToWork");

    const { ScrollSmoother } = require("gsap/ScrollSmoother");

    const interval = setInterval(() => {
      const smoother = ScrollSmoother.get();
      const el = document.getElementById("work");
      if (smoother && el) {
        clearInterval(interval);
        smoother.scrollTo(el, true);
      }
    }, 50);

    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loading]);

  useGSAP(() => {
    if (loading) {
      gsap.set(heroBgRef.current, { scale: 1.15 });
      return;
    }

    // scramble in
    gsap.to(".scroll-indicator p", {
      duration: 1,
      delay: 1,
      scrambleText: {
        text: "scroll to view work",
        chars: "lowerCase",
        speed: 0.5,
        revealDelay: 0.2,
      },
      ease: "none",
    });

    // fade out on scroll
    gsap.to(".scroll-indicator", {
      opacity: 0,
      y: -10,
      duration: 0.3,
      scrollTrigger: {
        trigger: ".hero-bg",
        start: "top top",
        end: "20% top",
        scrub: true,
      },
    });

    const cards = gsap.utils
      .toArray<HTMLElement>(".project-card")
      .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
    gsap.from(cards, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".project-card",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".divider-line", {
      drawSVG: "50% 50%",
      duration: 0.5,
      delay: 0.5,
      ease: "power2.out",
    });

    SplitText.create(".larger-title", {
      type: "words",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, {
          opacity: 0,
          filter: "blur(5px)",
          y: 20,
          duration: 0.4,
          stagger: 0.075,
          delay: 0,
          ease: "power2.out",
        });
      },
    });

    SplitText.create(".caption", {
      type: "lines",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          opacity: 0,
          filter: "blur(2px)",
          y: 20,
          duration: 0.4,
          stagger: 0.075,
          delay: 0.2,
          ease: "power2.out",
        });
      },
    });

    SplitText.create(".footnote", {
      type: "words",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, {
          opacity: 0,
          filter: "blur(1px)",
          x: 10,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
        });
      },
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
        <div className="flex flex-col items-center gap-2.5">
          <div
            ref={heroBgRef}
            className="hero-bg relative h-screen w-full flex flex-col justify-center items-center p-[10vw]"
          >
            <Magnetic strength={0.1} range={300}>
              <div className="flex flex-col gap-16 w-fit">
                <section className="flex flex-col items-start gap-1 self-stretch">
                  <div className="align-self-stretch">
                    <h1 className="larger-title">Helen Huang</h1>
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    <li className="flex items-start gap-2">
                      <span className="number">[一]</span>
                      <p className="caption">
                        Currently, I'm studying
                        <span className="caption-2">
                          {" "}
                          Computing and the Arts
                        </span>{" "}
                        at
                        <span className="caption-2"> Yale University*</span>.
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="number">[二]</span>
                      <p className="caption">
                        An interdisciplinary designer with a lot of love for
                        <span className="caption-2"> motion</span>, and
                        <span className="caption-2"> product design</span>.
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="number">[三]</span>
                      <p className="caption">
                        Outside of design, I enjoy
                        <span className="caption-2">
                          {" "}
                          learning new softwares
                        </span>
                        , and
                        <span className="caption-2">
                          {" "}
                          getting dimsum with family!
                        </span>
                      </p>
                    </li>
                  </ul>
                </section>

                <section className="flex justify-between center stretch">
                  <div className="flex center gap-3">
                    <a
                      href="mailto:helen.huang@example.com"
                      className="footnote"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      email
                    </a>
                    <Divider />
                    <a
                      href="https://www.linkedin.com/in/hailuen"
                      className="footnote"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin
                    </a>
                    <Divider />
                    <a
                      href="https://www.github.com/helenhuangg"
                      className="footnote"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://drive.google.com/file/d/15W1KgXSmgshSexg-WWLzFOE5tVucscPn/view"
                      className="footnote"
                    >
                      resume :D
                    </a>
                  </div>
                </section>
              </div>
            </Magnetic>

            {/* scroll indicator */}
            <button
              className="scroll-indicator absolute bottom-[3vw] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
              onClick={() =>
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#work", offsetY: 80 },
                })
              }
            >
              <p className="footnote">&nbsp;</p>
            </button>
          </div>

          <div id="work" className="w-full px-[10vw] overflow-hidden">
            <Masonry
              items={projects}
              columnCount={columnCount}
              columnGutter={24}
              rowGutter={24}
              render={({ data, index }) => <ProjectCard {...data} index={index} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
