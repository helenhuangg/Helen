"use client";
import { useRef } from "react";
import WorkNav from "@/app/components/WorkNav";
import WorkHeader from "@/app/components/WorkHeader";
import WorkSection from "@/app/components/WorkSection";
import WorkInfoBar from "@/app/components/WorkInfoBar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function YHack() {
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
    <div className="w-full pt-[5vh]">
      <WorkNav
        sections={[
          { id: "overview", label: "Overview" },
          { id: "role-breakdown", label: "Role Breakdown" },
          { id: "goals", label: "Goals" },
          { id: "ideation", label: "Ideation" },
          { id: "mid-fidelity", label: "Mid-Fidelity" },
          { id: "design-challenge", label: "Design Challenge" },
          { id: "final-design", label: "Final Design" },
          { id: "reflection", label: "Reflection" },
        ]}
      />

      <div
        ref={contentRef}
        className="flex flex-col gap-[10px] items-start p-[10px] px-4 lg:pl-[14vw] lg:pr-[6vw]"
      >
        <WorkHeader
          subtitle="YHACK SPRING 2026"
          title="Designing a Hackathon Site Worth Falling For"
          image="/images/yhack2.png"
          alt="YHack"
        />

        <WorkInfoBar
          items={[
            { label: "ROLE", value: "Lead Designer" },
            { label: "TIMELINE", value: "4 weeks" },
            { label: "TEAM", value: "Mandy Chen\nRohan Phanse" },
            {
              label: "RESPONSIBILITIES",
              value: "Branding\nUI/UX\nIllustrations",
            },
          ]}
        />

        <WorkSection id="overview" label="OVERVIEW" headline="What is YHack?">
          <p>
            I was introduced by a friend to help design the main YHack Spring
            2026 website. YHack is Yale&apos;s flagship hackathon, bringing in
            over 600 college builders for a 24 hours of hacking. 5 weeks prior
            to the launch date, the site was still blank but there was a theme
            and it was <span style={{ color: "#f23232" }}>Love</span>.
          </p>
        </WorkSection>

        <WorkSection
          id="role-breakdown"
          label="ROLE BREAKDOWN"
          headline="A Brief Rundown of My Tasks"
        >
          <div className="flex flex-col gap-4">
            <p>
              This was my first &quot;big&quot; project and I was handling most
              of the design work. Thankfully, another designer left me a color
              palette and logo to set the overall vibe of the site. It was
              definitely a{" "}
              <span style={{ color: "var(--color-primary)" }}>
                learning curve
              </span>{" "}
              as I didn&apos;t have much experience designing websites let alone
              hackathon ones. So before I even started, I researched multiple
              different hackathons (eg. TreeHacks, HackMIT, HackPrinceton
              etc...). Looking back, if I had the experience, I definitely
              wouldn&apos;t of taken as long as I did.
            </p>
            <div className="flex flex-col gap-2">
              <h5 className="subheadline">Team Members:</h5>
              <div className="flex flex-col gap-1">
                <p>
                  <span
                    style={{ color: "var(--color-primary)", fontWeight: 500 }}
                  >
                    Mandy Chen{" "}
                  </span>
                  designed four Handsome Dan variations, MLH graphics,
                  merchandise, created the Handsome Dan logo, established color
                  palette, and set overall tone with her initial landing page
                  section idea.
                </p>
                <p>
                  <span
                    style={{ color: "var(--color-primary)", fontWeight: 500 }}
                  >
                    Rohan Phanse{" "}
                  </span>
                  was the lead developer and main point of contact for asset
                  handoffs. He also created the Harkness Tower assets and made
                  multiple design iterations on the development side to bring
                  the site to life while making it functional.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="subheadline">My Role:</h5>
              <p>
                I led the{" "}
                <span style={{ color: "var(--color-primary)" }}>
                  end-to-end design
                </span>{" "}
                of the site, from lo-fi sketches to high fidelity wireframes. I
                was responsible for the full page layout, content hierarchy,
                scroll interactions, and custom assets including: clouds,
                floating islands, wax stamps, envelopes, postcards, YHack
                wordmark, and the Sterling Library illustration.
              </p>
            </div>
          </div>
        </WorkSection>

        <WorkSection
          id="goals"
          label="GOALS"
          headline="What am I Trying to Achieve in Designing for YHack?"
        >
          <p>
            As the theme was already set and key branding decisions met by
            Mandy, I focused my goals on translating that creative direction
            into a site thats: cohesive, immersive, and exciting to scroll
            through!
          </p>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {[
              {
                title: "1.) Create an immersive scroll experience",
                desc: "Site should feel like a journey, not just a page. Every Section should flow naturally onto the other.",
              },
              {
                title: "2.) Tell a story visually",
                desc: "Rather than leading with logistics, site should lead with personality. The theme of love needed to feel well-crafted and not gimmicky.",
              },
              {
                title: "3.) Keep information clear & accessible",
                desc: "As playful as the design was, hackers need to be able to navigate quickly to find what they are looking for.",
              },
            ].map((goal) => (
              <div key={goal.title} className="flex-1 flex flex-col gap-1">
                <p
                  className="subheadline2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {goal.title}
                </p>
                <p className="text-[14px] tracking-[-0.42px]">{goal.desc}</p>
              </div>
            ))}
          </div>
        </WorkSection>

        <WorkSection id="ideation" label="IDEATION" headline="Starting Big">
          <p>
            Kicking off with a broad brainstorm, after meeting with Mandy and
            Zoya some of the key ideas emerged:
          </p>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {[
              {
                title: "A sky-to-ground scroll narrative",
                desc: 'the page would visually "descend" from clouds and sky at the top to a grounded, lush environment below, following Handsome Dan on his journey',
              },
              {
                title: "Layered parallax animations",
                desc: "clouds, floating islands, and illustrated elements would shift at different speeds as the user scrolls, creating depth and a sense of movement",
              },
              {
                title: "Romantic micro-moments",
                desc: "envelopes that open, wax seals, postcards, and love letters woven into the UI to reinforce the Valentine\u2019s theme without being heavy-handed",
              },
            ].map((idea) => (
              <div key={idea.title} className="flex-1 flex flex-col gap-1">
                <p
                  className="subheadline2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {idea.title}
                </p>
                <p className="text-[14px] tracking-[-0.42px]">{idea.desc}</p>
              </div>
            ))}
          </div>
          <p>
            With a rough sketch and some thought, I finalized the typography and
            developed a design system for the site. There are still hints of my
            initial sketch within the final deliverable, however, it&apos;s
            still completely different.
          </p>
          <div
            className="w-full h-[675px] overflow-hidden relative"
            style={{
              backgroundColor: "var(--color-highlight)",
              border: "1px solid var(--color-accent)",
            }}
          >
            <p
              className="absolute left-4 top-3 text-[12px] tracking-[-0.6px] uppercase"
              style={{
                fontFamily: "var(--font-dm-mono)",
                color: "var(--color-accent)",
              }}
            >
              Design System + Rough draft
            </p>
          </div>
        </WorkSection>

        <WorkSection
          id="mid-fidelity"
          label="MID-FIDELITY"
          headline="Nailing Down the Content"
        >
          <p>
            Using the brainstorm, I moved into mid-fidelity with the question:
          </p>
          <div className="flex gap-5 items-center px-1 w-full">
            <div
              className="w-[2px] self-stretch"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
            <p
              className="flex-1 text-[20px] tracking-[-0.6px]"
              style={{
                fontFamily: "var(--font-eb-garamond)",
                fontStyle: "italic",
                color: "var(--color-primary)",
              }}
            >
              How do we design a site that is both immersive and cohesive while
              staying executable in the time frame and communicating the
              content?
            </p>
          </div>
          <p>
            This stage was all about structure, locking into content hierarchy,
            determining scroll interactions, and identifying required assets.
          </p>
          <div
            className="w-full h-[857px] overflow-hidden relative"
            style={{
              backgroundColor: "var(--color-highlight)",
              border: "1px solid var(--color-accent)",
            }}
          >
            <p
              className="absolute left-4 top-3 text-[12px] tracking-[-0.6px] uppercase"
              style={{
                fontFamily: "var(--font-dm-mono)",
                color: "var(--color-accent)",
              }}
            >
              KEY FEATURES + WIREFRAMES
            </p>
          </div>
        </WorkSection>

        <WorkSection
          id="design-challenge"
          label="DESIGN CHALLENGE"
          headline="Defining and Completing Graphic Asset Requirements"
        >
          <p>
            Even though most of the wireframes were set, there were placeholders
            everywhere. We needed a lot of custom assets and I never made any...
            which is why I think it took really long because I somehow made it.
            I worked closely with Mandy to brief, iterate, and refine assets
            like the cupid Handsome Dan and environmental assets while I tackled
            assets like clouds, wax stamps, envelopes, postcards, and the
            Sterling Memorial Library.
          </p>
          <div
            className="w-full h-[846px] overflow-hidden relative"
            style={{
              backgroundColor: "var(--color-highlight)",
              border: "1px solid var(--color-accent)",
            }}
          >
            <p
              className="absolute left-4 top-3 text-[12px] tracking-[-0.6px] uppercase"
              style={{
                fontFamily: "var(--font-dm-mono)",
                color: "var(--color-accent)",
              }}
            >
              ASSETS I MADE
            </p>
          </div>
        </WorkSection>

        <WorkSection
          id="final-design"
          label="FINAL DESIGN"
          headline="A Website Designed with Love"
        >
          <p>Here is a full list of features I designed!</p>
          <div
            className="w-full h-[1995px] overflow-hidden relative"
            style={{
              backgroundColor: "var(--color-highlight)",
              border: "1px solid var(--color-accent)",
            }}
          >
            <p
              className="absolute left-4 top-3 text-[12px] tracking-[-0.6px] uppercase"
              style={{
                fontFamily: "var(--font-dm-mono)",
                color: "var(--color-accent)",
              }}
            >
              MOCKUPS + DESIGN DECISIONS
            </p>
            <p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[12px] tracking-[-0.6px] uppercase"
              style={{
                fontFamily: "var(--font-dm-mono)",
                color: "var(--color-accent)",
              }}
            >
              THIS IS ONLY MY FINAL MOCKUP, CHANGES WILL BE MADE &rarr; CHECK
              OUT YHACK.ORG
            </p>
          </div>
        </WorkSection>

        <WorkSection
          id="reflection"
          label="REFLECTION"
          headline="Challenges &amp; Outcomes"
        >
          <div className="flex gap-6 w-full">
            <div className="flex-1 flex flex-col gap-1">
              <p
                className="subheadline2"
                style={{ color: "var(--color-primary)" }}
              >
                Navigating an Experimental Process
              </p>
              <p className="text-[14px] tracking-[-0.42px]">
                So much of this process was experimental, I found myself putting
                in more time and effort than I anticipated, and sometimes on the
                incorrect things. This was largely due to my inexperience but it
                taught me to iterate with purpose. This project went through
                countless revisions and every single one of them were shaped by
                valuable feedback from both Mandy and Rohan.
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p
                className="subheadline2"
                style={{ color: "var(--color-primary)" }}
              >
                Learning What It Truly Means to Work in a Cross-Functional Team
              </p>
              <p className="text-[14px] tracking-[-0.42px]">
                Designing for YHack gave me the chance to work with other people
                and get their perspectives. It made me realize that it&apos;s
                not just about doing your part but also staying align,
                communicative, and trusting the people you are working with.
              </p>
            </div>
          </div>
        </WorkSection>
      </div>
    </div>
  );
}
