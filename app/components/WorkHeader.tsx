"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface WorkHeaderProps {
  subtitle: string;
  title: string;
  image: string;
  alt: string;
}

export default function WorkHeader({
  subtitle,
  title,
  image,
  alt,
}: WorkHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1 });

      SplitText.create(".wh-subtitle", {
        type: "chars",
        autoSplit: true,
        onSplit(self) {
          tl.from(
            self.chars,
            {
              opacity: 0,
              y: 10,
              duration: 0.3,
              stagger: 0.02,
              ease: "power2.out",
            },
            0,
          );
        },
      });

      SplitText.create(".wh-title", {
        type: "words",
        autoSplit: true,
        onSplit(self) {
          tl.from(
            self.words,
            {
              opacity: 0,
              filter: "blur(4px)",
              y: 20,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
            },
            0.2,
          );
        },
      });

      tl.to(
        ".wh-hero",
        { opacity: 1, duration: 0.85, ease: "power2.out" },
        0.2,
      );
    },
    { scope: headerRef },
  );

  return (
    <div ref={headerRef} className="flex flex-col gap-6 items-center w-full">
      <div className="flex flex-col gap-1.5 items-center">
        <p
          className="wh-subtitle callout"
          style={{ color: "var(--color-highlight)" }}
        >
          {subtitle}
        </p>
        <h3
          className="wh-title title-2 text-center"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </h3>
      </div>

      <div className="wh-hero w-full rounded-[20px] overflow-hidden aspect-video opacity-0">
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
