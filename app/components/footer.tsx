"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./footer.module.css";

const GARDEN_LINKS = [
  { label: "Work", href: "/" },
  { label: "Crafts", href: "/fun" },
  { label: "About", href: "/about" },
];

const SAY_HI_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hailuen" },
  { label: "GitHub", href: "https://www.github.com/helenhuangg" },
  { label: "Resume", href: "/Helen_Huang_Resume.pdf" },
];

const LAST_UPDATED = "9/25/2026";

export default function Footer() {
  const craft = usePathname() === "/fun";

  return (
    <footer className={`relative w-full overflow-hidden px-6 pb-9 pt-[110px] lg:px-[min(215px,15vw)] ${craft ? styles.craft : ""}`}>
      {!craft && <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-10%] bottom-0 h-[280px] bg-[#b3bfcb] blur-[48px]"
      />}

      <div className="relative flex flex-col gap-16 sm:flex-row sm:items-start sm:justify-between">
        <p className="footer-tagline">Continue making for what feels right.</p>

        <div className="flex gap-[69px]">
          <div>
            <p className="footer-heading mb-[17px]">Garden</p>
            <ul className="flex flex-col gap-[17px]">
              {GARDEN_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading mb-[17px]">Say hi</p>
            <ul className="flex flex-col gap-[17px]">
              {SAY_HI_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative mt-16 flex flex-col gap-3 sm:mt-24 sm:flex-row sm:items-end sm:justify-between">
        <p className="footer-meta">
          © 2026 Helen Huang, last updated: {LAST_UPDATED}
        </p>
        <p className="footer-meta">made with lots of thoughts & matchas</p>
      </div>
    </footer>
  );
}
