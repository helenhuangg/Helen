import { ReactNode } from "react";

interface WorkSectionProps {
  id: string;
  label?: string;
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
      className={`work-section flex flex-col gap-2 items-start py-[10px] w-full ${className ?? ""}`}
    >
      {label && (
        <h5 className="callout" style={{ color: "var(--color-highlight)" }}>
          {label}
        </h5>
      )}
      {headline && <h4 className="headline">{headline}</h4>}
      {children}
    </section>
  );
}
