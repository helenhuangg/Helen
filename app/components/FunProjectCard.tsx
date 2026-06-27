type FunProjectCardProps = {
  title: string;
  tag: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderHeight?: number;
};

export default function FunProjectCard({
  title,
  tag,
  description,
  imageSrc,
  imageAlt,
  placeholderHeight,
}: FunProjectCardProps) {
  return (
    <article className="fun-card flex w-full flex-col gap-2.5">
      {imageSrc ? (
        <div className="relative w-full overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="block h-auto w-full object-cover"
          />
        </div>
      ) : (
        <div
          className="w-full shrink-0 bg-white"
          style={{ height: placeholderHeight ?? 280 }}
          aria-hidden
        />
      )}

      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-start justify-between gap-3">
          <h2
            className="min-w-0 flex-1 text-[24px] tracking-[-0.48px]"
            style={{
              fontFamily: "var(--font-Adobe-Caslon-Pro)",
              color: "var(--color-primary)",
            }}
          >
            {title}
          </h2>
          <span
            className="cardTag shrink-0 px-2.5 py-0.5"
            style={{ background: "var(--color-accent)" }}
          >
            {tag}
          </span>
        </div>
        <p
          className="w-full text-[16px] tracking-[-0.32px]"
          style={{
            fontFamily: "var(--font-Alte-Haas-Grotesk)",
            color: "var(--color-highlight)",
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
