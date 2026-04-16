import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackPageview } from "@/lib/analytics";
import { useScrollDepth } from "@/hooks/useScrollDepth";

export function PageViewTracker() {
  const location = useLocation();
  useScrollDepth();

  useEffect(() => {
    // GA4 SPA pageview (skips admin too — keep analytics on public pages only)
    if (!location.pathname.startsWith("/admin")) {
      trackPageview(location.pathname + location.search);
    }

    // Internal Supabase tracking (unchanged behavior)
    if (location.pathname.startsWith("/admin")) return;

    supabase.from("page_views").insert({
      path: location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });
  }, [location.pathname, location.search]);

  return null;
}
