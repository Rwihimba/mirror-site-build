import { useEffect, useState } from "react";

const DISMISS_KEY = "popup_dismissed_until";
const SESSION_KEY = "popup_shown_session";
const KILL_SWITCH = "popup_disabled";

const MIN_SECONDS = 25;
const MIN_SCROLL_DESKTOP = 0.5;
const MIN_SCROLL_MOBILE = 0.6;
const DISMISS_DAYS = 7;

const ALLOWED_PATHS = [
  "/",
  "/solutions",
  "/about",
  "/careers",
  "/investors",
  "/for-mining-companies",
  "/partners",
];

function isAllowedPath(path: string): boolean {
  return ALLOWED_PATHS.some((p) => p === path || (p !== "/" && path.startsWith(p)));
}

function isSuppressed(): boolean {
  if (typeof window === "undefined") return true;
  if (localStorage.getItem(KILL_SWITCH) === "1") return true;
  if (sessionStorage.getItem(SESSION_KEY) === "1") return true;
  const until = localStorage.getItem(DISMISS_KEY);
  if (until && Date.now() < parseInt(until, 10)) return true;
  return false;
}

export function usePopupTrigger(path: string): {
  shouldShow: boolean;
  markShown: () => void;
  markDismissed: () => void;
} {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!isAllowedPath(path)) return;
    if (isSuppressed()) return;

    const isMobile = window.innerWidth < 768;
    const minScroll = isMobile ? MIN_SCROLL_MOBILE : MIN_SCROLL_DESKTOP;

    let timeReached = false;
    let scrollReached = false;
    let fired = false;

    const fire = () => {
      if (fired) return;
      if (timeReached && scrollReached) {
        fired = true;
        setShouldShow(true);
      }
    };

    const timer = window.setTimeout(() => {
      timeReached = true;
      fire();
    }, MIN_SECONDS * 1000);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (scrolled >= minScroll) {
        scrollReached = true;
        fire();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [path]);

  return {
    shouldShow,
    markShown: () => sessionStorage.setItem(SESSION_KEY, "1"),
    markDismissed: () => {
      const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(DISMISS_KEY, String(until));
      sessionStorage.setItem(SESSION_KEY, "1");
    },
  };
}
