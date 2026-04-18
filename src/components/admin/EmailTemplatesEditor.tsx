import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface Template {
  id: string;
  key: string;
  name: string;
  subject: string;
  body_html: string;
  from_name: string;
  delay_minutes: number;
  is_active: boolean;
}

const VARS = ["candidate_name", "job_title", "assignment_link", "submission_link", "deadline", "calendly_url", "primary_color"];

export function EmailTemplatesEditor() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selected, setSelected] = useState<Template | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("pipeline_email_templates").select("*").order("key");
    if (data) {
      setTemplates(data as Template[]);
      if (!selected && data.length) setSelected(data[0] as Template);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase.from("pipeline_email_templates").update({
      subject: selected.subject,
      body_html: selected.body_html,
      from_name: selected.from_name,
      delay_minutes: selected.delay_minutes,
      is_active: selected.is_active,
    }).eq("id", selected.id);
    setSaving(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Saved" }); load(); }
  };

  const insertVar = (v: string) => {
    if (!selected) return;
    setSelected({ ...selected, body_html: selected.body_html + ` {{${v}}}` });
  };

  return (
    <div className="grid lg:grid-cols-4 gap-4">
      <div className="bg-card rounded-lg border border-border p-3 space-y-1">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => setSelected(t)}
            className={`w-full text-left px-3 py-2 rounded text-sm font-body transition ${selected?.id === t.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            <div className="font-medium">{t.name}</div>
            <div className="text-xs opacity-70">{t.key}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="lg:col-span-3 bg-card rounded-lg border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-lg">{selected.name}</h3>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Active</Label>
              <Switch checked={selected.is_active} onCheckedChange={(v) => setSelected({ ...selected, is_active: v })} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>From name</Label>
              <Input value={selected.from_name} onChange={(e) => setSelected({ ...selected, from_name: e.target.value })} />
            </div>
            <div>
              <Label>Delay (minutes after trigger)</Label>
              <Input type="number" value={selected.delay_minutes} onChange={(e) => setSelected({ ...selected, delay_minutes: Number(e.target.value) })} />
            </div>
          </div>

          <div>
            <Label>Subject</Label>
            <Input value={selected.subject} onChange={(e) => setSelected({ ...selected, subject: e.target.value })} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Body (HTML)</Label>
              <div className="flex flex-wrap gap-1">
                {VARS.map(v => (
                  <button key={v} onClick={() => insertVar(v)} className="text-xs px-2 py-1 bg-muted rounded hover:bg-muted/70 font-mono">
                    {`{{${v}}}`}
                  </button>
                ))}
              </div>
            </div>
            <Textarea rows={12} value={selected.body_html} onChange={(e) => setSelected({ ...selected, body_html: e.target.value })} className="font-mono text-xs" />
          </div>

          <div>
            <Label className="mb-2 block">Preview</Label>
            <div className="border border-border rounded p-4 bg-background" dangerouslySetInnerHTML={{ __html: selected.body_html }} />
          </div>

          <Button onClick={save} disabled={saving}>
            <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save template"}
          </Button>
        </div>
      )}
    </div>
  );
}
