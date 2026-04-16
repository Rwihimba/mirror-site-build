import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { detectIntent, getABBucket } from "@/lib/intent/detectIntent";
import { POPUP_VARIANTS, DEFAULT_VARIANT } from "@/lib/intent/popupVariants";
import { usePopupTrigger } from "@/lib/intent/usePopupTrigger";
import { supabase } from "@/integrations/supabase/client";

export default function IntentPopup() {
  const location = useLocation();
  const { shouldShow, markShown, markDismissed } = usePopupTrigger(location.pathname);
  const [open, setOpen] = useState(false);
  const [intent] = useState(() => detectIntent());
  const [bucket] = useState(() => getABBucket());

  const variant =
    intent === "unknown" ? DEFAULT_VARIANT : POPUP_VARIANTS[intent];
  const resolvedIntent = intent === "unknown" ? "mining-co" : intent;

  const logEvent = (event_type: "impression" | "click" | "dismiss") => {
    supabase.from("popup_events").insert({
      event_type,
      variant: resolvedIntent,
      intent: resolvedIntent,
      path: location.pathname,
      referrer: document.referrer || null,
      ab_bucket: bucket,
    });
  };

  useEffect(() => {
    if (shouldShow && !open) {
      setOpen(true);
      markShown();
      logEvent("impression");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow]);

  const handleDismiss = () => {
    logEvent("dismiss");
    markDismissed();
    setOpen(false);
  };

  const handleClick = () => {
    logEvent("click");
    markDismissed();
  };

  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-[60] max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300"
      role="dialog"
      aria-labelledby="popup-title"
    >
      <div className="relative bg-card text-card-foreground border border-border rounded-lg shadow-2xl p-5 pr-10">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-[11px] font-body uppercase tracking-[0.18em] text-primary mb-2">
          {variant.eyebrow}
        </div>
        <h3 id="popup-title" className="text-lg font-display font-semibold leading-snug mb-2">
          {variant.title}
        </h3>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
          {variant.description}
        </p>

        {variant.cta.external ? (
          <Button asChild size="sm" className="w-full group" onClick={handleClick}>
            <a href={variant.cta.href} target="_blank" rel="noopener noreferrer">
              {variant.cta.label}
              <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        ) : (
          <Button asChild size="sm" className="w-full group" onClick={handleClick}>
            <Link to={variant.cta.href}>
              {variant.cta.label}
              <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
