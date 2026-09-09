"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Work", href: "/" },
  { label: "Fragments", href: "/fun" },
  { label: "About", href: "/about" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hailuen" },
  { label: "GitHub", href: "https://www.github.com/helenhuangg" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1pSQv6oYWgAKggDZ_Z5LegXw_tSoMkCXx/view?usp=sharing",
  },
];

const LAST_UPDATED = "Wed Sep 9 2026";

function useCurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Date()
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/New_York",
        })
        .replace(" ", "")
        .toLowerCase();

    setTime(format());
    const interval = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export default function Footer() {
  const time = useCurrentTime();

  return (
    <footer
      className="w-full px-4 lg:px-[6vw] pt-[52px] pb-[36px]"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-background)",
      }}
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <p className="footer-tagline">
          Made with the thought of the jasmine milk tea my mom makes
        </p>

        <div className="flex gap-x-14">
          <div>
            <p className="footer-heading mb-[14px]">Pages</p>
            <ul className="flex flex-col gap-[14px]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading mb-[14px]">Find me</p>
            <ul className="flex flex-col gap-[14px]">
              {SOCIAL_LINKS.map((link) => (
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

      <div className="footer-meta mt-16 sm:mt-[112px]">
        {/* Rendered client-side, so the first paint has no time to show yet. */}
        <p>{time ? `Currently ${time} in New Haven, Connecticut` : "\u00a0"}</p>
        <p>Last updated on {LAST_UPDATED}</p>
      </div>
    </footer>
  );
}
