"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const PreloaderContext = createContext({
  hasShown: false,
  markShown: () => {},
});

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [hasShown, setHasShown] = useState(false);

  return (
    <PreloaderContext.Provider value={{ hasShown, markShown: () => setHasShown(true) }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
