"use client";

import { useRef } from "react";
import WorkNav from "@/app/components/WorkNav";
import WorkHeader from "@/app/components/WorkHeader";
import WorkSection from "@/app/components/WorkSection";
import WorkInfoBar from "@/app/components/WorkInfoBar";
import WorkMediaSlot from "@/app/components/WorkMediaSlot";
import ScrollPlayVideo from "@/app/components/ScrollPlayVideo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Drop files here — leave empty until you have them.
const HERO_VIDEO_SRC = "";
const DEMO_YOUTUBE_ID = "95AB5zyNXjE";

const NAV_SECTIONS = [
  { id: "the-problem", label: "Problem" },
  { id: "role-breakdown", label: "My Role" },
  { id: "the-research", label: "The Research" },
  { id: "the-solution", label: "The Solution" },
  { id: "product", label: "The Features" },
  { id: "safeguards", label: "Precautions" },
  { id: "reflection", label: "Reflection" },
] as const;

const STATS = [
  {
    value: "30",
    unit: "years old",
    caption: "age when balance starts to decline",
  },
  { value: "38,000", unit: "deaths", caption: "each year from falling" },
  {
    value: "50 mil",
    unit: "Americans",
    caption: "are affected by balance disorders",
  },
] as const;

const PRODUCT_SECTIONS = [
  {
    id: "onboarding",
    headline: "Personalized From Day One",
    copy: "Onboarding flexes to fit patients recovering from injury, athletes & dancers, and casual users alike.",
    slot: "Onboarding screens",
    video: "/videos/onboard.mp4",
  },
  {
    id: "live-balance",
    headline: "Stay Balanced, Stay Safe",
    copy: "Real-time tracking of center of gravity, with instant feedback the moment balance starts to slip, built to catch small issues before they become injuries.",
    slot: "Live Balance screens",
    video: "/videos/live.mp4",
  },
  {
    id: "practice",
    headline: "Practice, Your Way",
    copy: "Structured PT-recommended modules and games, both sorted by balance type so training always has a purpose. Whether it’s a guided session with a mirror-mode feedback or a quick game chasing a personal best.",
    slot: "Training screens",
    video: "/videos/prac.mp4",
  },
  {
    id: "profile",
    headline: "Profile",
    copy: "Your app, made easy.",
    slot: "Profile screens",
    video: "/videos/profile_1.mp4",
  },
] as const;

const LEARNINGS = [
  "Building a tool that reads balance as an early warning sign showed us how much health tech overlooks the small, everyday signals our bodies give",
  "Designing for patients, athletes, and casual users at once taught us that “one-size-fits-all” rarely works in health — personalization has to be built in from the start.",
  "Working through a fast, remote 3-day sprint pushed us to trust our instincts fast, especially when deciding what to keep from AI tools like Figma Make.",
] as const;

function YouTubeEmbed({ id }: { id: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[14px]">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="Libra demo"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function Libra() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".work-section");
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const skipIds = new Set(["the-research", "reflection"]);
      const scroller = isMobile ? "#smooth-wrapper" : undefined;

      if (isMobile) {
        gsap.set(sections, { opacity: 1, y: 0 });
      } else {
        sections.forEach((section) => {
          if (skipIds.has(section.id)) return;
          gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          });
        });
      }

      const playStagger = (selector: string, trigger: string) => {
        const els = gsap.utils.toArray<HTMLElement>(selector);
        if (els.length === 0) return;
        gsap.set(els, { opacity: 0, y: 32 });
        ScrollTrigger.create({
          trigger,
          start: "top 80%",
          scroller,
          once: true,
          onEnter: () => {
            gsap.to(els, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.16,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
      };

      playStagger(".libra-stat", "#the-research");
      playStagger(".libra-learning", "#reflection");
      requestAnimationFrame(() => ScrollTrigger.refresh());
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
          subtitle="FIGBUILD 2026"
          title="Libra: See Your Sixth Sense"
          image="/images/libra_thumbnail.png"
          alt="Libra"
          videoSrc={HERO_VIDEO_SRC || undefined}
        />

        <WorkInfoBar
          items={[
            { label: "ROLE", value: "Product Designer" },
            { label: "TIMELINE", value: "March 7 — March 9, 2026" },
            { label: "TEAM", value: "Mandy Chen\nMiffy Wang\nChris Shia" },
            { label: "RESPONSIBILITIES", value: "Branding\nUI/UX" },
          ]}
        />

        <WorkSection
          id="the-problem"
          label="THE PROBLEM"
          headline="Alysa's ankle has been compensating for months without her realizing it. She figured that was just part of being an athlete."
        >
          <p>
            Most people never train their balance instead they just rely on
            instinct. That instinct shifts with age, injury, or a growing body,
            but the decline goes unnoticed until a fall or a dizzy spell forces
            it into view. Even then, it&apos;s often written off as mental —
            nerves, a bad day — rather than something that can be measured and
            rebuilt into a new sense
          </p>
        </WorkSection>

        <WorkSection
          id="role-breakdown"
          label="ROLE BREAKDOWN"
          headline="My Responsibilities"
        >
          <p>
            I worked on building out the visual identity and shape assets for
            the project, and collaborated closely with the team on wire-framing
            and prototyping. I also designed the Figma presentation slides and
            added small animations to the demo video to give it a bit of extra
            polish! Such a fun experience!
          </p>
        </WorkSection>

        <WorkSection
          id="the-research"
          label="THE RESEARCH"
          headline="What We Found"
        >
          <div className="grid w-full grid-cols-3 gap-2 sm:gap-[19px]">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="libra-stat flex min-h-[180px] flex-col items-center justify-between rounded-[11px] px-2 py-4 text-center sm:min-h-[237px] sm:px-6 sm:py-6"
                style={{
                  backgroundColor: "#d4dbe3",
                  color: "var(--color-primary)",
                }}
              >
                <div className="flex flex-col items-center opacity-90">
                  <p
                    className="!text-[clamp(1.5rem,7vw,3.8rem)] !leading-none !font-bold !tracking-[-1px] !text-[var(--color-primary)]"
                    style={{ fontFamily: "var(--font-Alte-Haas-Grotesk)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="!text-[clamp(0.875rem,3.4vw,1.7rem)] !leading-tight !text-[var(--color-primary)]"
                    style={{ fontFamily: "var(--font-Alte-Haas-Grotesk)" }}
                  >
                    {stat.unit}
                  </p>
                </div>
                <p
                  className="max-w-[11.5rem] !text-[13px] !leading-snug !text-[var(--color-primary)] sm:!text-[20px]"
                  style={{ fontFamily: "var(--font-eb-garamond)" }}
                >
                  {stat.caption}
                </p>
              </div>
            ))}
          </div>
          <p>
            Mandy, Miffy, and Chris&apos; research and interviews revealed
            something surprising: balance is an invisible but critical factor in
            mortality across all age groups.
          </p>
        </WorkSection>

        <WorkSection
          id="the-solution"
          label="THE SOLUTION"
          headline="Introducing: Libra"
        >
          <p>
            Most people never train their balance instead they just rely on
            instinct. That instinct shifts with age, injury, or a growing body,
            but the decline goes unnoticed until a fall or a dizzy spell forces
            it into view. Even then, it&apos;s often written off as mental
            nerves, a bad day, rather than something that can be measured and
            rebuilt into a new sense
          </p>
          {DEMO_YOUTUBE_ID ? (
            <YouTubeEmbed id={DEMO_YOUTUBE_ID} />
          ) : (
            <WorkMediaSlot
              label="YouTube demo"
              heightClass="aspect-video min-h-[280px]"
            />
          )}
        </WorkSection>

        <div id="product" className="flex w-full flex-col gap-[10px]">
          {PRODUCT_SECTIONS.map((section) => (
            <WorkSection
              key={section.id}
              id={section.id}
              headline={section.headline}
            >
              <p>{section.copy}</p>
              <ScrollPlayVideo
                src={section.video}
                className="w-full rounded-[14px] object-cover"
                controls
              />
            </WorkSection>
          ))}
        </div>

        <WorkSection
          id="safeguards"
          label="ENSURING RESPONSIBLE DESIGN"
          headline="Safeguards & Considerations"
        >
          <img
            src="/images/libra/privacy.jpg"
            alt="Privacy and Consent screens"
            className="w-full rounded-[14px]"
            width={1600}
            height={900}
          />
          <img
            src="/images/libra/emergency.jpg"
            alt="Emergency Protocols screens"
            className="w-full rounded-[14px]"
            width={1600}
            height={900}
          />
        </WorkSection>

        <WorkSection id="reflection" label="REFLECTION" headline="Looking Back">
          <div className="flex w-full flex-col gap-4">
            {LEARNINGS.map((learning) => (
              <div
                key={learning}
                className="libra-learning rounded-[15px] border px-7 py-7"
                style={{
                  backgroundColor: "#d4dbe3",
                  borderColor: "var(--color-accent)",
                }}
              >
                <p
                  className="!text-[16px] !leading-normal !tracking-[-0.5px]"
                  style={{ fontFamily: "var(--font-Alte-Haas-Grotesk)" }}
                >
                  {learning}
                </p>
              </div>
            ))}
          </div>
        </WorkSection>
      </div>
    </div>
  );
}
