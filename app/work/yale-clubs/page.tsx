"use client";

import WorkNav from "@/app/components/WorkNav";
import WorkHeader from "@/app/components/WorkHeader";

export default function YaleClubs() {
  return (
    <div className="w-full pt-[5vh] lg:pt-[calc(5rem+5vh)]">
      <WorkNav sections={[]} />

      <div className="flex flex-col gap-[10px] items-start p-[10px] px-6 lg:pl-[calc(6vw+10rem+0.75rem)] lg:pr-[6vw]">
        <WorkHeader subtitle="0 → 1 Design" title="YaleClubs" />
      </div>
    </div>
  );
}
