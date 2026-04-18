import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface Settings {
  calendly_url: string;
  assignment_link: string;
  assignment_duration_hours: number;
  reminder_offsets_hours: number[];
  notification_email: string;
  brand_logo_url: string;
  brand_primary_color: string;
  brand_signature_html: string;
}

export function PipelineSettings() {
  const [s, setS] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("pipeline_settings").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) setS(data as Settings);
    });
  }, []);

  const save = async () => {
    if (!s) return;
    setSaving(true);
    const { error } = await supabase.from("pipeline_settings").update(s).eq("id", 1);
    setSaving(false);
    toast({
      title: error ? "Error" : "Saved",
      description: error?.message ?? "Pipeline settings updated.",
      variant: error ? "destructive" : "default",
    });
  };

  if (!s) return <div className="p-6 text-muted-foreground">Loading...</div>;

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4 max-w-3xl">
      <h3 className="font-display font-semibold text-lg">Pipeline Settings</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Calendly URL</Label>
          <Input value={s.calendly_url} onChange={(e) => setS({ ...s, calendly_url: e.target.value })} placeholder="https://calendly.com/your-link" />
        </div>
        <div>
          <Label>Assignment link</Label>
          <Input value={s.assignment_link} onChange={(e) => setS({ ...s, assignment_link: e.target.value })} placeholder="https://docs.google.com/..." />
        </div>
        <div>
          <Label>Assignment deadline (hours)</Label>
          <Input type="number" value={s.assignment_duration_hours} onChange={(e) => setS({ ...s, assignment_duration_hours: Number(e.target.value) })} />
        </div>
        <div>
          <Label>Reminder offsets (hours, comma-sep). Negative = after deadline</Label>
          <Input
            value={s.reminder_offsets_hours.join(",")}
            onChange={(e) => setS({ ...s, reminder_offsets_hours: e.target.value.split(",").map(v => Number(v.trim())).filter(v => !isNaN(v)) })}
            placeholder="24, -2"
          />
        </div>
        <div>
          <Label>Notification email (BCC)</Label>
          <Input value={s.notification_email} onChange={(e) => setS({ ...s, notification_email: e.target.value })} />
        </div>
        <div>
          <Label>Brand primary color</Label>
          <Input value={s.brand_primary_color} onChange={(e) => setS({ ...s, brand_primary_color: e.target.value })} placeholder="#7A3E1A" />
        </div>
        <div className="md:col-span-2">
          <Label>Brand logo URL</Label>
          <Input value={s.brand_logo_url} onChange={(e) => setS({ ...s, brand_logo_url: e.target.value })} placeholder="https://..." />
        </div>
        <div className="md:col-span-2">
          <Label>Email signature (HTML)</Label>
          <Textarea rows={3} value={s.brand_signature_html} onChange={(e) => setS({ ...s, brand_signature_html: e.target.value })} />
        </div>
      </div>

      <Button onClick={save} disabled={saving}>
        <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save settings"}
      </Button>
    </div>
  );
}
