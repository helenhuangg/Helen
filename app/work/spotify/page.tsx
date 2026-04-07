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
    <div className="w-full pt-[5vh] lg:pt-[calc(5rem+5vh)]">
      <WorkNav
        sections={[
          { id: "context", label: "Context" },
          { id: "video", label: "Video" },
          { id: "styleframes", label: "Styleframes" },
        ]}
      />

      <div
        ref={contentRef}
        className="flex flex-col gap-[10px] items-start p-[10px] px-4 lg:pl-[calc(6vw+10rem+0.75rem)] lg:pr-[6vw]"
      >
        <WorkHeader
          subtitle="FALL 2024"
          title="Spotify Brand Commercial"
          image="/images/spotify2.png"
          alt="Spotify"
        />

        <WorkSection id="context" label="Context">
          <p className="body text-[var(--color-secondary)]">
            I made this for an assignment in my high school digital media class.
            However, with my digital media teacher's support and feedback, it
            was awarded 3rd place in the Student Television Network Spring
            Nationals under the Commercial category in 2024.
          </p>
          <p className="body text-[var(--color-secondary)]">
            It's been 2 years since I made this, I don't remember much about the
            process. However, I do remember it being a lot of fun and rewarding
            to see my work recognized as well as the idea of making multiple
            iterations.
          </p>
          <p className="body text-[var(--color-secondary)]">
            I started taking motion design more seriously and explored more
            about how it can influence user experience.
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
