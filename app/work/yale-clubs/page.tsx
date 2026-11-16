import CaseStudyLayout from "../CaseStudyLayout";
import styles from "../case-study.module.css";

const sections = [
  { id: "overview", label: "Overview", title: "Why YaleClubs Needed a Redesign", prompt: "Describe how students and club organizers used the old site, and what the dev lead asked you to improve." },
  { id: "process", label: "Process", title: "From Discovery to a First Meeting", prompt: "Walk through the flow you focused on, the alternatives you explored, and the feedback that changed your design. Add sketches or before-and-after screens here." },
  { id: "outcome", label: "Outcome", title: "The Redesigned Experience", prompt: "Show the key screens and explain what each change makes easier. Add the prototype when it’s ready to share." },
  { id: "next-steps", label: "Next Steps", title: "From Design to Development", copy: "The redesign is complete, and the dev team is now building it. I’ll be able to assess its impact after launch, once students have had a chance to use it to discover clubs and find their first meeting." },
  { id: "reflection", label: "Reflection", title: "What I Learned", prompt: "Share one lesson from working with the dev lead and what you’d explore next." },
];

const outlineSections = [
  { id: "summary", label: "TL;DR" },
  ...sections.map(({ id, label }) => ({ id, label })),
];

export default function YaleClubs() {
  return (
    <CaseStudyLayout
      cover={{ src: "/images/yale-clubs.png", alt: "YaleClubs redesign preview" }}
      sections={outlineSections}
    >
          <h1>Redesigning YaleClubs</h1>
          <p className={styles.deck}>Helping Yale students go from discovering a club to showing up for their first meeting.</p>
          <dl className={styles.facts}>
            {[
              ["Role", "Product Designer"],
              ["Timeline", "Add project dates"],
              ["Software", "Add tools used"],
              ["Team", "Add dev lead and collaborators"],
            ].map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <section id="summary" className={styles.summary} aria-labelledby="yale-clubs-summary">
            <h2 id="yale-clubs-summary" className={styles.label}>TL;DR</h2>
            <p>The dev lead asked me to redesign YaleClubs. I focused on helping Yale students go from discovering a club to showing up for their first meeting. The design is complete, and the dev team is building it now.</p>
          </section>
          {sections.map(({ id, label, title, prompt, copy }) => (
            <section key={id} id={id} className={styles.section}>
              <div className={styles.sectionHeading}>
                <p className={styles.label}>{label}</p>
                <h2>{title}</h2>
              </div>
              <p>{copy ?? <em>{prompt}</em>}</p>
            </section>
          ))}
    </CaseStudyLayout>
  );
}
