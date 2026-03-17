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
      className="flex items-center justify-between px-4 lg:px-[6vw] py-[30px] font-[family-name:var(--font-dm-mono)] text-[6px] tracking-[-0.5px]"
      style={{
        backgroundColor: "var(--color-primary)",
        color: "var(--color-background)",
      }}
    >
      <div className="flex flex-col gap-0 self-stretch">
        <p className="text-[10px]">{time} | NEW HAVEN, CT</p>
        <p className="text-[10px] uppercase">
          made with next.js and a cup of milk tea my mom made :D
        </p>
      </div>
      <div className="flex flex-col gap-0 self-stretch items-end text-right">
        <p className="text-[10px] uppercase">2026 © Helen Huang</p>
        <p className="text-[10px] uppercase">
          Last updated: mar 17, 2026
        </p>
      </div>
    </footer>
  );
}
