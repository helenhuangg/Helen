import { ReactNode } from "react";

interface WorkSectionProps {
  id: string;
  label: string;
  headline?: string;
  children: ReactNode;
  className?: string;
}

export default function WorkSection({
  id,
  label,
  headline,
  children,
  className,
}: WorkSectionProps) {
  return (
    <section
      id={id}
      className={`work-section flex flex-col gap-4 items-start py-[10px] w-full ${className ?? ""}`}
    >
      <div className="flex flex-col items-start gap-1">
        <h5 className="callout" style={{ color: "var(--color-highlight)" }}>
          {label}
        </h5>
        {headline && <h4 className="headline">{headline}</h4>}
      </div>
      {children}
    </section>
  );
}
