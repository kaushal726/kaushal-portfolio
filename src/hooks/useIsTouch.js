import { useState, useEffect } from "react";

const QUERY = "(hover: none) and (pointer: coarse)";

// Detects touch/mobile devices (no hover, coarse pointer).
// Used to disable mouse-tracking effects (cursor spotlights, magnetic
// wrappers, MouseFollower) that are pointless and laggy on touch screens.
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(QUERY);
    const handler = (e) => setIsTouch(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  return isTouch;
}
