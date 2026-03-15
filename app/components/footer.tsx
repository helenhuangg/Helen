"use client";

import { useState, useEffect } from "react";

function useCurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/New_York",
      });

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
      className="flex items-center justify-between px-4 lg:px-[10vw] py-[30px] font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[-0.5px]"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-background)",
      }}
    >
      <p>{time} | NEW HAVEN, CT</p>
      <p className="uppercase">2026 © Helen Huang</p>
    </footer>
  );
}
