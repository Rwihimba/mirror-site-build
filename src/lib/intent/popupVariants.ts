import type { Intent } from "./detectIntent";

export interface PopupVariant {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string; external?: boolean };
}

export const CALENDLY_URL = "https://calendly.com/minetech-rwanda/30min";

export const POPUP_VARIANTS: Record<Exclude<Intent, "unknown">, PopupVariant> = {
  investor: {
    eyebrow: "For Investors",
    title: "Invest in the future of mining technology",
    description:
      "Africa's mining sector is being rebuilt on intelligent infrastructure. Book a 30-minute call to see why MineTech is leading that shift.",
    cta: { label: "Book a Call", href: CALENDLY_URL, external: true },
  },
  "mining-co": {
    eyebrow: "For Mining Operators",
    title: "Optimize safety and productivity in your operations",
    description:
      "See how MineTech unifies safety, fleet, compliance and grade control into one real-time intelligence layer for your mine.",
    cta: { label: "Request a Demo", href: "/for-mining-companies#demo" },
  },
  talent: {
    eyebrow: "Join the Team",
    title: "Join a cutting-edge mining tech startup",
    description:
      "We're hiring engineers, data scientists and mining professionals across Africa. Browse open roles and apply directly.",
    cta: { label: "View Careers", href: "/careers" },
  },
};

// Default variant for "unknown" intent — kept generic and helpful
export const DEFAULT_VARIANT: PopupVariant = POPUP_VARIANTS["mining-co"];
