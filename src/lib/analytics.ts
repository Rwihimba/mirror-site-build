// Lightweight GA4 wrapper. Safe no-op until VITE_GA_MEASUREMENT_ID is set.
// Naming convention: action = "<category>_<verb>" (e.g. form_submit, cta_click).

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || "";
export const isGAEnabled = () => Boolean(GA_ID) && typeof window !== "undefined" && typeof window.gtag === "function";

export type EventParams = Record<string, string | number | boolean | undefined>;

export function track(action: string, params: EventParams = {}) {
  if (!isGAEnabled()) return;
  try {
    window.gtag!("event", action, params);
  } catch {
    /* swallow */
  }
}

export function trackPageview(path: string) {
  if (!isGAEnabled()) return;
  try {
    window.gtag!("config", GA_ID, { page_path: path, anonymize_ip: true });
  } catch {
    /* swallow */
  }
}

// Convenience helpers
export const trackFormSubmit = (formName: string, extra: EventParams = {}) =>
  track("form_submit", { category: "conversion", form: formName, ...extra });

export const trackCtaClick = (label: string, extra: EventParams = {}) =>
  track("cta_click", { category: "engagement", label, ...extra });

// Phase 2 demand-tracking helpers. All carry audience / product / source
// so the admin Demand panel can later attribute every click to a door.
export type Audience = "cooperatives" | "large_miners" | "traders" | "regulators";
export type Product = "os" | "corp" | "trace" | "upstream" | "telco";

export const trackRoleRouterClick = (
  audience: Audience,
  source: string = "home"
) => track("role_router_click", { category: "engagement", audience, source });

export const trackProductTileClick = (
  product: Product,
  source: string = "home"
) => track("product_tile_click", { category: "engagement", product, source });

export const trackLeadSubmit = (
  formName: string,
  context: { audience?: Audience; product?: Product; source?: string } = {}
) =>
  track("lead_submit", {
    category: "conversion",
    form: formName,
    ...context,
  });
