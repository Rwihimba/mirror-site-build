import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "@/lib/analytics";

const THRESHOLDS = [50, 75, 100];

export function useScrollDepth() {
  const location = useLocation();

  useEffect(() => {
    const fired = new Set<number>();
    const startedAt = Date.now();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.round((scrollTop / max) * 100));
      for (const t of THRESHOLDS) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          track("scroll_depth", { category: "engagement", percent: t, path: location.pathname });
        }
      }
    };

    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handler, { passive: true });

    return () => {
      window.removeEventListener("scroll", handler);
      const seconds = Math.round((Date.now() - startedAt) / 1000);
      if (seconds >= 3) {
        track("time_on_page", { category: "engagement", seconds, path: location.pathname });
      }
    };
  }, [location.pathname]);
}
