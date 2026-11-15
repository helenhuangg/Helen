"use client";

import { useEffect } from "react";
import { defineBluePuddle } from "./blue-puddle-element";
import styles from "./PuddleBackground.module.css";

type BluePuddleEl = HTMLElement & {
  drop: (x?: number, y?: number, ambient?: boolean) => void;
};

export default function PuddleBackground() {
  useEffect(() => {
    defineBluePuddle();
    const wrapper = document.getElementById("smooth-wrapper");
    if (!wrapper) return;

    const node = document.createElement("div");
    node.className = styles.layer;

    const puddle = document.createElement("blue-puddle") as BluePuddleEl;
    puddle.className = styles.puddle;
    puddle.setAttribute("tabindex", "-1");
    puddle.setAttribute("aria-hidden", "true");

    const interactive = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)",
    ).matches;
    if (!interactive) puddle.setAttribute("speed", "0.55");

    node.appendChild(puddle);
    wrapper.insertBefore(node, wrapper.firstChild);

    const onPointer = (event: PointerEvent) => {
      if (!interactive || event.button !== 0) return;
      const rect = puddle.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      puddle.drop(
        (event.clientX - rect.left) / rect.width,
        (event.clientY - rect.top) / rect.height,
      );
    };

    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      node.remove();
    };
  }, []);

  return null;
}
