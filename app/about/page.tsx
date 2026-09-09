"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useSfx from "@/app/components/useSfx";

// Widths are the design's frame widths at a 173px strip height; they drive each
// photo's aspect ratio so the row keeps its rhythm as the height scales.
const PHOTOS = [
  {
    src: "/images/about/strip-1.jpg",
    width: 130,
    caption: "go squirrels! #branfordian",
  },
  {
    src: "/images/about/strip-2.jpg",
    width: 231,
    caption: "always craving matcha",
  },
  {
    src: "/images/about/strip-3.jpg",
    width: 137,
    caption: "fun fact: i'm peak ascendant in valorant (don't ask how)",
  },
  {
    src: "/images/about/strip-4.jpg",
    width: 179,
    caption: "hi, that's me o3o",
  },
  {
    src: "/images/about/strip-5.jpg",
    width: 231,
    caption: "missing korea always",
  },
  {
    src: "/images/about/strip-6.jpg",
    width: 244,
    caption: "my hometown!",
  },
];

const PARAGRAPHS = [
  "Hi, I’m Helen! I study Computing & the Arts at Yale University. I’m an interdisciplinary designer with a ton of love for motion graphics, storytelling, and design engineering.",
  "The laptop I begged my parents to buy when I was 8 years old kickstarted my design journey. Having grown up a pretty quiet kid, I realized there’s more to communicating with others than just words.",
  "Being able to be logical about design problems while maintaining aesthetics where functionality and elegance coexisted to understand how people communicate with the world always made me motivated to design.",
  "When I’m not on my 15 hour Figma streak you can most likely find me grabbing boba with friends, scrapbooking, or taking pictures of everything and anything!",
];

const ORGS = [
  {
    name: "Figma",
    logo: "/images/orgs/figma.png",
    logoSize: 30,
    role: "Campus Leader",
    dates: "Aug 2026 — Present",
  },
  {
    name: "Yale Computer Society",
    logo: "/images/orgs/yale-computer-society.png",
    logoSize: 28,
    role: "Director of Design",
    dates: "May 2026 — Present",
  },
  {
    name: "Design at Yale",
    logo: "/images/orgs/design-at-yale.png",
    logoSize: 34,
    role: "Co-Head of Studios",
    dates: "Sep 2025 — Present",
  },
  {
    name: "DFA Studios",
    logo: "/images/orgs/dfa-yale.png",
    logoSize: 30,
    role: "Design Director",
    dates: "Sep 2025 — Present",
  },
  {
    name: "Student Technology Collaborative",
    logo: "/images/orgs/student-technology-collaborative.png",
    logoSize: 28,
    role: "Studios Designer",
    dates: "Jan 2026 — Present",
  },
  {
    name: "YHack",
    logo: "/images/orgs/yhack.png",
    logoSize: 42,
    role: "Lead Designer",
    dates: "Dec 2025 — Feb 2026",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  // The caption text and position outlive the hover so it can fade out instead
  // of vanishing mid-transition.
  const [caption, setCaption] = useState({ text: PHOTOS[0].caption, left: 0 });
  const [captionVisible, setCaptionVisible] = useState(false);
  const playSelectSfx = useSfx("/audio/select.mp3");

  useGSAP(
    () => {
      gsap.from(".about-heading", {
        opacity: 0,
        filter: "blur(8px)",
        y: 24,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(".about-lede", {
        opacity: 0,
        filter: "blur(4px)",
        y: 16,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.from(".about-photo", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      });
      gsap.from(".about-reveal", {
        opacity: 0,
        filter: "blur(4px)",
        y: 16,
        duration: 0.5,
        delay: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full px-4 lg:px-[6vw] pt-[calc(5rem+5vh)] pb-[12vh]"
    >
      <div className="flex flex-col items-center gap-[10px] text-center">
        <h1 className="about-heading">About Me</h1>
        <p className="about-lede max-w-[242px]">
          what i like to do, why i design, and more!
        </p>
      </div>

      {/* w-fit keeps the block as wide as the photos so it can center, while
          max-w-full still lets the row scroll on narrow screens. */}
      <div className="mx-auto mt-10 w-fit max-w-full">
        <div
          ref={stripRef}
          className="about-strip no-scrollbar flex gap-[15px] overflow-x-auto"
        >
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="about-photo shrink-0 overflow-hidden"
              style={{
                width: `calc(var(--strip-height) * ${photo.width / 173})`,
              }}
              onMouseEnter={(event) => {
                const stripLeft =
                  stripRef.current?.getBoundingClientRect().left ?? 0;
                setCaption({
                  text: photo.caption,
                  left: Math.round(
                    event.currentTarget.getBoundingClientRect().left -
                      stripLeft,
                  ),
                });
                setCaptionVisible(true);
                playSelectSfx();
              }}
              onMouseLeave={() => setCaptionVisible(false)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Sits under whichever photo is hovered; the max-width keeps a long
            caption from spilling past the right edge of the row. */}
        <div className="relative mt-[18px] h-5">
          <p
            className={`about-photo-caption absolute top-0 ${
              captionVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: caption.left,
              maxWidth: `calc(100% - ${caption.left}px)`,
            }}
          >
            {caption.text}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-[690px] flex-col items-center gap-[48px]">
        <hr className="about-rule about-reveal" />

        <div className="about-reveal flex w-full max-w-[524px] flex-col gap-[1.15em]">
          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="about-body">
              {paragraph}
            </p>
          ))}
        </div>

        <hr className="about-rule about-reveal" />

        <div className="about-reveal flex w-full max-w-[524px] flex-col gap-8">
          {ORGS.map((org) => (
            <div
              key={org.name}
              className="flex items-start justify-between gap-6"
            >
              <div className="flex min-w-0 items-center gap-4 sm:gap-[25px]">
                <span
                  className="flex size-[54px] shrink-0 items-center justify-center overflow-hidden rounded-[1px]"
                  style={{ border: "1.5px solid var(--color-highlight)" }}
                >
                  <img
                    src={org.logo}
                    alt={`${org.name} logo`}
                    className="object-contain"
                    style={{ height: org.logoSize, width: org.logoSize }}
                  />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="about-org-name">{org.name}</span>
                  <span className="about-org-role">{org.role}</span>
                </span>
              </div>

              <span className="about-org-dates shrink-0">{org.dates}</span>
            </div>
          ))}

          <p className="about-note">Open to Summer 2027 internships!</p>
        </div>

        <hr className="about-rule about-reveal" />
      </div>
    </div>
  );
}
