import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PopupEvent {
  id: string;
  event_type: "impression" | "click" | "dismiss";
  variant: string;
  intent: string;
  path: string;
  ab_bucket: string | null;
  created_at: string;
}

export function PopupAnalytics() {
  const [events, setEvents] = useState<PopupEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("popup_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (data) setEvents(data as PopupEvent[]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  const impressions = events.filter((e) => e.event_type === "impression").length;
  const clicks = events.filter((e) => e.event_type === "click").length;
  const dismissals = events.filter((e) => e.event_type === "dismiss").length;
  const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : "0.0";

  const byVariant = events.reduce<Record<string, { impression: number; click: number; dismiss: number }>>((acc, e) => {
    if (!acc[e.variant]) acc[e.variant] = { impression: 0, click: 0, dismiss: 0 };
    acc[e.variant][e.event_type] += 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Impressions" value={impressions} />
        <Stat label="Clicks" value={clicks} />
        <Stat label="Dismissals" value={dismissals} />
        <Stat label="CTR" value={`${ctr}%`} highlight />
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-display font-semibold mb-4">Performance by Intent</h3>
        {Object.keys(byVariant).length === 0 ? (
          <p className="text-sm text-muted-foreground">No popup events yet.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(byVariant).map(([variant, counts]) => {
              const variantCtr = counts.impression > 0 ? ((counts.click / counts.impression) * 100).toFixed(1) : "0.0";
              return (
                <div key={variant} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <span className="font-body capitalize">{variant.replace("-", " ")}</span>
                  <div className="flex gap-6 text-sm font-body">
                    <span className="text-muted-foreground">{counts.impression} shown</span>
                    <span className="text-muted-foreground">{counts.click} clicks</span>
                    <span className="font-semibold text-primary">{variantCtr}% CTR</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-display font-semibold mb-4">Recent Events</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.slice(0, 50).map((e) => (
            <div key={e.id} className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-xs bg-muted font-body capitalize">{e.event_type}</span>
                <span className="font-body capitalize text-muted-foreground">{e.variant}</span>
                <span className="font-body text-xs text-muted-foreground truncate">{e.path}</span>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(e.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <p className="text-sm text-muted-foreground font-body">{label}</p>
      <p className={`text-2xl font-display font-semibold ${highlight ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}
