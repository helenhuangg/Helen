"use client";

import { useRef } from "react";
import WorkNav from "@/app/components/WorkNav";
import WorkHeader from "@/app/components/WorkHeader";
import WorkSection from "@/app/components/WorkSection";
import WorkInfoBar from "@/app/components/WorkInfoBar";
import ScrollPlayVideo from "@/app/components/ScrollPlayVideo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "thanksgiving-food-drive", label: "Thanksgiving Food Drive" },
  { id: "flower-sale-fundraiser", label: "Flower Sale Fundraiser" },
  { id: "quickchews-commercial", label: "QuickChews Commercial" },
  { id: "job-fair", label: "Job Fair" },
  { id: "dog-dish", label: "Dog Dish" },
  { id: "club-corner", label: "Club Corner" },
] as const;

const VIDEO_SECTIONS = [
  {
    id: "thanksgiving-food-drive",
    label: "PROMOTIONAL VIDEO",
    headline: "Thanksgiving Food Drive",
    copy: "My school has an annual Thanksgiving food drive and I was tasked to make an informational video to spread the news! My goal was to make it simple, easy to follow but also engaging! Adding a variety of shapes and emphasising the main points while using school colors.",
    src: "/videos/Thanksgiving Food Drive Promotional Video.mp4",
  },
  {
    id: "flower-sale-fundraiser",
    label: "PROMOTIONAL VIDEO",
    headline: "Flower Sale Fundraiser",
    copy: "Our club also participated in Student Television Network Film Convention that gets hosted at places from across the United States, however because of the distance, we were looking for funding. Since I was also going, I thought it was only right to promote the fundraiser that also happened to be in Feburary! Following a similar style, I chose to color pink to show love and used the flower concept as transitions.",
    src: "/videos/Flower Sale Fundraiser Promotional Video.mp4",
  },
  {
    id: "quickchews-commercial",
    label: "COMMERCIAL VIDEO",
    headline: "QuickChews Commercial",
    copy: "For the Student Television Network, my friend and I collaborated to enter the Commercial category. I worked on the graphics while she handled the videography and direction.",
    src: "/videos/QuickChews Commercial Video.mp4",
  },
  {
    id: "job-fair",
    label: "PROMOTIONAL VIDEO",
    headline: "Job Fair",
    copy: "Our district was hosting a job fair so I helped make an informational video!",
    src: "/videos/D218 Job Fair Promotional Video.mp4",
  },
  {
    id: "dog-dish",
    label: "MOTION GRAPHICS",
    headline: "Dog Dish",
    copy: "Dog Dish was a segment that had short news compilation for the week or month and I made an intro for it!",
    src: "/videos/Dog Dish Intro.mp4",
  },
  {
    id: "club-corner",
    label: "MOTION GRAPHICS",
    headline: "Club Corner",
    copy: "Club Corner was a new segment added before I graduated where we introduced clubs at my school to increase involvement and showcase each club!",
    src: "/videos/Club Corner Intro.mp4",
  },
] as const;

export default function BulldogDispatch() {
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
      <WorkNav sections={[...NAV_SECTIONS]} />

      <div
        ref={contentRef}
        className="flex flex-col gap-[10px] items-start p-[10px] px-4 lg:pl-[calc(6vw+10rem+0.75rem)] lg:pr-[6vw]"
      >
        <WorkHeader
          subtitle="RICHARDS HIGH SCHOOL"
          title="Finding My Voice Through Motion"
          image="/images/bd2.png"
          alt="Bulldog Dispatch motion graphics"
        />

        <WorkInfoBar
          items={[
            { label: "ROLE", value: "Lead Motion Designer" },
            { label: "TIMELINE", value: "Aug 2022 to May 2025" },
            { label: "TEAM", value: "Bulldog Dispatch" },
            { label: "TAGS", value: "Branding\nMotion Graphics" },
          ]}
        />

        <WorkSection id="overview" label="CONTEXT" headline="Bulldog Dispatch">
          <p className="body text-[var(--color-secondary)]">
            Prior to high school, I joined many ‘editing groups’ which involved
            collaborating on animations and video edits as well as participating
            in fun community events online. Through that, I was motivated to
            join my high school broadcast team after one of the episodes was
            displayed in the middle of class! I’ve always been very shy so
            joining the club was my first step of going out of my comfort zone
            and since then I’ve never regretted it and enjoyed having my work
            displayed for the community I was in.
          </p>
        </WorkSection>

        {VIDEO_SECTIONS.map((section) => (
          <WorkSection
            key={section.id}
            id={section.id}
            label={section.label}
            headline={section.headline}
            className="gap-6"
          >
            <p className="body text-[var(--color-secondary)]">{section.copy}</p>
            <ScrollPlayVideo
              src={section.src}
              className="w-full object-cover"
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </WorkSection>
        ))}
      </div>
    </div>
  );
}
