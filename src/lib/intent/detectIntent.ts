export type Intent = "investor" | "mining-co" | "talent" | "unknown";

const INVESTOR_KEYWORDS = ["invest", "funding", "vc", "venture", "pitch", "capital", "fundraise"];
const MINING_KEYWORDS = ["mining", "mine", "ore", "safety", "fleet", "compliance", "extraction", "industrial"];
const TALENT_KEYWORDS = ["career", "job", "hire", "hiring", "recruit", "engineer", "developer"];

const matches = (text: string, list: string[]) => {
  const lower = text.toLowerCase();
  return list.some((kw) => lower.includes(kw));
};

export function detectIntent(): Intent {
  if (typeof window === "undefined") return "unknown";

  // 1. URL params win (UTM / gclid hints)
  const params = new URLSearchParams(window.location.search);
  const utm = `${params.get("utm_source") || ""} ${params.get("utm_campaign") || ""} ${params.get("utm_term") || ""}`;
  if (utm.trim()) {
    if (matches(utm, INVESTOR_KEYWORDS)) return "investor";
    if (matches(utm, TALENT_KEYWORDS)) return "talent";
    if (matches(utm, MINING_KEYWORDS)) return "mining-co";
  }

  // 2. Path-based detection
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith("/investors")) return "investor";
  if (path.startsWith("/careers")) return "talent";
  if (path.startsWith("/for-mining-companies") || path.startsWith("/solutions")) return "mining-co";

  // 3. Referrer (search engine query string sometimes has q= param)
  const ref = document.referrer || "";
  if (ref) {
    if (matches(ref, INVESTOR_KEYWORDS)) return "investor";
    if (matches(ref, TALENT_KEYWORDS)) return "talent";
    if (matches(ref, MINING_KEYWORDS)) return "mining-co";
  }

  return "unknown";
}

export function getABBucket(): "A" | "B" {
  const KEY = "popup_ab_bucket";
  let bucket = localStorage.getItem(KEY) as "A" | "B" | null;
  if (!bucket) {
    bucket = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem(KEY, bucket);
  }
  return bucket;
}
