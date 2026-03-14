"use client";
import { useRef } from "react";
import WorkNav from "@/app/components/WorkNav";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as any;

export default function Spotify() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1 });

      SplitText.create(".spot-subtitle", {
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

      SplitText.create(".spot-title", {
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

      gsap.set(".spot-hero", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(".spot-hero img", { scale: 1.3 });

      tl.to(
        ".spot-hero",
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "power4.inOut",
        },
        0,
      ).to(
        ".spot-hero img",
        {
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.2,
      );

      gsap.utils.toArray<HTMLElement>(".spot-section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: contentRef },
  );

  return (
    <div className="w-full pt-[10vh]">
      <WorkNav
        sections={[
          { id: "context", label: "Context" },
          { id: "video", label: "Video" },
          { id: "styleframes", label: "Styleframes" },
        ]}
      />

      <div
        ref={contentRef}
        className="flex flex-col gap-[10px] items-start p-[10px] px-4 lg:pl-[22vw] lg:pr-[10vw]"
      >
        {/* title block */}
        <div className="flex flex-col gap-6 items-center w-full">
          <div className="flex flex-col gap-0.5 items-center">
            <p
              className="spot-subtitle callout"
              style={{ color: "var(--color-highlight)" }}
            >
              FALL 2024
            </p>
            <h3
              className="spot-title title-2"
              style={{ color: "var(--color-primary)" }}
            >
              Spotify Brand Commercial
            </h3>
          </div>

          {/* hero image */}
          <div className="spot-hero w-full rounded-[20px] overflow-hidden aspect-video">
            <img
              src="/images/spotify2.png"
              alt="Spotify"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* context section */}
        <section
          id="context"
          className="spot-section flex flex-col gap-4 items-start py-[10px] w-full"
        >
          <h5 className="callout" style={{ color: "var(--color-highlight)" }}>
            Context
          </h5>
          <p className="body text-[var(--color-secondary)]">
            This is a personal project of mine made my junior year of high
            school or around Feb 2024 (?). Initially, an experimental project
            for a school assignment evolved into an award winning piece that
            earned{" "}
            <strong>
              3rd place in the Student Television Network Spring Nationals under
              the Commercial category
            </strong>{" "}
            in 2024. My digital media teacher gave me so much support and
            feedback and this was really the kick start to my motivation to make
            more motion design.
          </p>
        </section>

        {/* vimeo video */}
        <section
          id="video"
          className="spot-section flex flex-col items-start py-[10px] w-full gap-6"
        >
          <h5 className="callout" style={{ color: "var(--color-highlight)" }}>
            Video
          </h5>
          <div className="w-full aspect-video">
            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/1153268089?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                title="Spotify Commercial"
              ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
        </section>

        {/* styleframes section */}
        <section
          id="styleframes"
          className="spot-section flex flex-col items-start py-[10px] w-full gap-6"
        >
          <h5 className="callout" style={{ color: "var(--color-highlight)" }}>
            Styleframes
          </h5>

          <div className="grid grid-cols-2 gap-4 w-full">
            <video
              src="/videos/spot1.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <video
              src="/videos/spot3.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <video
              src="/videos/spot4.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <video
              src="/videos/spot5.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <video
              src="/videos/spot6.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </section>
      </div>
    </div>
  );
}
