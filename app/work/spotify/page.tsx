"use client";
import { useRef } from "react";
import WorkNav from "@/app/components/WorkNav";
import WorkHeader from "@/app/components/WorkHeader";
import WorkSection from "@/app/components/WorkSection";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as any;

export default function Spotify() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".work-section");
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;

      if (isMobile) {
        gsap.set(sections, { opacity: 1, y: 0 });
      } else {
        sections.forEach((section) => {
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
      }
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
        <WorkHeader
          subtitle="FALL 2024"
          title="Spotify Brand Commercial"
          image="/images/spotify2.png"
          alt="Spotify"
        />

        <WorkSection id="context" label="Context">
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
        </WorkSection>

        <WorkSection id="video" label="Video" className="gap-6">
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
        </WorkSection>

        <WorkSection id="styleframes" label="Styleframes" className="gap-6">
          <div className="grid grid-cols-1 gap-4 w-full lg:grid-cols-2">
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
        </WorkSection>
      </div>
    </div>
  );
}
