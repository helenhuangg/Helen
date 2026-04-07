"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Masonry = dynamic(
  () => import("masonic").then((mod) => ({ default: mod.Masonry })),
  { ssr: false },
) as unknown as typeof import("masonic").Masonry;

function useImageStackColumnCount() {
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setColumnCount(1);
      else setColumnCount(2);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columnCount;
}

export type WorkMediaSlotImage = {
  src: string;
  alt: string;
  /** Shown above the image (e.g. page section name) */
  sectionLabel?: string;
  caption?: string;
};

function WorkMediaImageStack({
  images,
  layout = "masonry",
}: {
  images: ReadonlyArray<WorkMediaSlotImage>;
  layout?: "masonry" | "stack";
}) {
  const columnCount = useImageStackColumnCount();
  const items = [...images];

  const renderFigure = (
    data: WorkMediaSlotImage,
    options?: { maxWidthInBox?: "75%" },
  ) => (
    <figure
      key={data.src}
      className={
        options?.maxWidthInBox === "75%"
          ? "m-0 mx-auto w-full max-w-[90%] sm:max-w-[75%]"
          : "m-0"
      }
    >
      {data.sectionLabel ? (
        <p
          className="mb-3 text-center text-[12px] tracking-[-0.6px] uppercase"
          style={{
            fontFamily: "var(--font-dm-mono)",
            color: "var(--color-accent)",
          }}
        >
          {data.sectionLabel}
        </p>
      ) : null}
      <img
        src={data.src}
        alt={data.alt}
        className="block h-auto w-full max-w-full object-contain"
      />
      {data.caption ? (
        <figcaption
          className="mt-3 whitespace-pre-line text-[14px] leading-snug tracking-[-0.42px]"
          style={{ color: "var(--color-primary)" }}
        >
          {data.caption}
        </figcaption>
      ) : null}
    </figure>
  );

  if (layout === "stack") {
    return (
      <div className="flex flex-col gap-8 px-4 pt-14 pb-6">
        {items.map((data) => renderFigure(data, { maxWidthInBox: "75%" }))}
      </div>
    );
  }

  return (
    <div className="px-4 pt-14 pb-6">
      <Masonry
        items={items}
        columnCount={columnCount}
        columnGutter={16}
        rowGutter={16}
        itemHeightEstimate={360}
        itemKey={(data) => data.src}
        render={({ data }) => renderFigure(data)}
      />
    </div>
  );
}

type WorkMediaSlotProps = {
  label: string;
  heightClass?: string;
  src?: string;
  alt?: string;
  images?: ReadonlyArray<WorkMediaSlotImage>;
  /** Default `masonry` (2 columns on wide screens). Use `stack` for a single vertical column. */
  imagesLayout?: "masonry" | "stack";
  footer?: ReactNode;
};

export default function WorkMediaSlot({
  label,
  heightClass = "",
  src,
  alt = "",
  images,
  imagesLayout = "masonry",
  footer,
}: WorkMediaSlotProps) {
  const hasStack = images && images.length > 0;

  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${hasStack ? "mx-auto max-w-5xl" : ""} ${hasStack ? "" : heightClass}`}
      style={{
        backgroundColor: "var(--color-highlight)",
        border: "1px solid var(--color-accent)",
      }}
    >
      <p
        className="absolute left-4 top-3 z-10 text-[12px] tracking-[-0.6px] uppercase"
        style={{
          fontFamily: "var(--font-dm-mono)",
          color: "var(--color-accent)",
        }}
      >
        {label}
      </p>
      {hasStack && images ? (
        <WorkMediaImageStack images={images} layout={imagesLayout} />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pt-14 pb-2">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain"
            />
          ) : null}
        </div>
      )}
      {footer ? (
        <div className="shrink-0 px-4 pb-6 text-center">{footer}</div>
      ) : null}
    </div>
  );
}
