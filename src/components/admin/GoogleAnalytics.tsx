import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { CalendarIcon, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface GAReport {
  totals: { users: number; sessions: number; pageviews: number; engagementRate: number };
  topPages: { path: string; views: number }[];
  sources: { channel: string; source: string; sessions: number }[];
  events: { name: string; count: number }[];
  range: { startDate: string; endDate: string };
}

function fmtDate(d: Date) {
  return format(d, "yyyy-MM-dd");
}

export function GoogleAnalytics() {
  const [start, setStart] = useState<Date>(subDays(new Date(), 30));
  const [end, setEnd] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GAReport | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    const { data: res, error: err } = await supabase.functions.invoke("ga-report", {
      body: { startDate: fmtDate(start), endDate: fmtDate(end) },
    });
    if (err) {
      setError(err.message);
    } else if (res?.error) {
      setError(res.error);
    } else {
      setData(res as GAReport);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Date controls */}
      <div className="flex flex-wrap items-end gap-3">
        <DatePick label="Start date" value={start} onChange={setStart} />
        <DatePick label="End date" value={end} onChange={setEnd} />
        <Button onClick={fetchReport} disabled={loading}>
          <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
          {loading ? "Loading…" : "Refresh"}
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive border border-destructive/30 rounded-lg p-4 text-sm font-body">
          {error}
        </div>
      )}

      {/* Totals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Users" value={data?.totals.users ?? "—"} highlight />
        <Stat label="Sessions" value={data?.totals.sessions ?? "—"} />
        <Stat label="Pageviews" value={data?.totals.pageviews ?? "—"} />
        <Stat
          label="Engagement Rate"
          value={data ? `${(data.totals.engagementRate * 100).toFixed(1)}%` : "—"}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card title="Top Pages">
          {data?.topPages.length ? (
            <BarList items={data.topPages.map((p) => ({ label: p.path, value: p.views }))} />
          ) : (
            <Empty />
          )}
        </Card>

        {/* Sources */}
        <Card title="Traffic Sources">
          {data?.sources.length ? (
            <div className="space-y-3">
              {data.sources.map((s, i) => (
                <Row
                  key={`${s.channel}-${s.source}-${i}`}
                  left={
                    <div>
                      <div className="font-body text-sm">{s.source || "(direct)"}</div>
                      <div className="text-xs text-muted-foreground capitalize">{s.channel}</div>
                    </div>
                  }
                  right={<span className="font-display font-semibold">{s.sessions}</span>}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </Card>
      </div>

      {/* Events */}
      <Card title="Events (Clicks, Form Submits, Popups)">
        {data?.events.length ? (
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {data.events.map((e) => (
              <Row
                key={e.name}
                left={<span className="font-body text-sm">{e.name}</span>}
                right={<span className="font-display font-semibold">{e.count}</span>}
              />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Card>
    </div>
  );
}

function DatePick({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Date;
  onChange: (d: Date) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground font-body">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {format(value, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(d) => d && onChange(d)}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <p className="text-sm text-muted-foreground font-body">{label}</p>
      <p
        className={cn(
          "text-2xl font-display font-semibold",
          highlight ? "text-primary" : ""
        )}
      >
        {value}
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="font-display font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Row({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-0">
      {left}
      {right}
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-muted-foreground font-body">No data for this range.</p>;
}

function BarList({ items }: { items: { label: string; value: number }[] }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-2">
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-body truncate mr-3">{it.label}</span>
            <span className="font-display font-semibold">{it.value}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(it.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
