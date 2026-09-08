"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Plays a short UI sound. Browsers reject playback until the page has been
 * interacted with, so those rejections are swallowed instead of surfacing on
 * every early hover.
 */
export default function useSfx(src: string, volume = 0.35) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;
  }, [src, volume]);

  return useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, []);
}
