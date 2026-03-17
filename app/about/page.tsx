"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen pt-[10vh] px-4 lg:px-[6vw] flex flex-col items-start"
    >
      <h1
        className="about-title narrative-1 drop-cap w-full"
        style={{ color: "var(--color-primary)" }}
      >
        More about me.
      </h1>
      <p className="about-subtitle text-left w-full">Work in Progress.</p>
    </div>
  );
}
