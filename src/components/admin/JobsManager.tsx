import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Pencil, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { FormBuilder } from "./FormBuilder";
import type { FormFieldDef } from "@/components/forms/DynamicApplicationForm";

const JOB_CATEGORIES = ["Core Technical", "Domain Expert", "Growth & Market"] as const;

type DescBlock = { heading: string; body: string };

interface JobRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  short_description: string | null;
  description: DescBlock[];
  form_schema: FormFieldDef[];
  is_published: boolean;
  sort_order: number;
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const emptyJob = (): JobRecord => ({
  id: "",
  slug: "",
  title: "",
  category: "Core Technical",
  department: "",
  location: "",
  employment_type: "Full-time",
  short_description: "",
  description: [{ heading: "About the Role", body: "" }],
  form_schema: [
    { id: "name", type: "text", label: "Full Name", required: true },
    { id: "email", type: "email", label: "Email Address", required: true },
    { id: "cv", type: "file", label: "CV / Resume", required: true, accept: ".pdf,.doc,.docx" },
  ],
  is_published: true,
  sort_order: 0,
});

export function JobsManager() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<JobRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<JobRecord | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    const { data } = await supabase.from("jobs").select("*").order("sort_order", { ascending: true });
    setJobs((data as unknown as JobRecord[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const togglePublish = async (job: JobRecord) => {
    const { error } = await supabase.from("jobs").update({ is_published: !job.is_published }).eq("id", job.id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setJobs((p) => p.map((j) => (j.id === job.id ? { ...j, is_published: !j.is_published } : j)));
  };

  const removeJob = async (job: JobRecord) => {
    if (!confirm(`Delete "${job.title}"? This also removes all applications for this role.`)) return;
    const { error } = await supabase.from("jobs").delete().eq("id", job.id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setJobs((p) => p.filter((j) => j.id !== job.id));
    toast({ title: "Deleted", description: `${job.title} removed.` });
  };

  const saveJob = async () => {
    if (!editing) return;
    if (!editing.title.trim()) return toast({ title: "Title required", variant: "destructive" });
    const slug = editing.slug.trim() || slugify(editing.title);
    setSaving(true);
    const payload = {
      slug,
      title: editing.title,
      category: editing.category,
      department: editing.department || null,
      location: editing.location || null,
      employment_type: editing.employment_type || null,
      short_description: editing.short_description || null,
      description: editing.description as never,
      form_schema: editing.form_schema as never,
      is_published: editing.is_published,
      sort_order: editing.sort_order,
    };

    if (editing.id) {
      const { error } = await supabase.from("jobs").update(payload).eq("id", editing.id);
      if (error) { setSaving(false); return toast({ title: "Error", description: error.message, variant: "destructive" }); }
    } else {
      const { error } = await supabase.from("jobs").insert(payload);
      if (error) { setSaving(false); return toast({ title: "Error", description: error.message, variant: "destructive" }); }
    }
    setSaving(false);
    setEditing(null);
    toast({ title: "Saved", description: "Job saved successfully." });
    fetchJobs();
  };

  // ============ EDITOR VIEW ============
  if (editing) {
    const updateDesc = (i: number, patch: Partial<DescBlock>) => {
      const next = [...editing.description];
      next[i] = { ...next[i], ...patch };
      setEditing({ ...editing, description: next });
    };
    const addBlock = () => setEditing({ ...editing, description: [...editing.description, { heading: "", body: "" }] });
    const removeBlock = (i: number) => setEditing({ ...editing, description: editing.description.filter((_, idx) => idx !== i) });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to jobs
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={saveJob} disabled={saving}>{saving ? "Saving…" : "Save Job"}</Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-display font-semibold text-lg">Basics</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="font-body">Title *</Label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} className="font-body" />
            </div>
            <div>
              <Label className="font-body">Slug (URL)</Label>
              <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })} className="font-body font-mono text-sm" placeholder="auto-generated" />
            </div>
            <div>
              <Label className="font-body">Category</Label>
              <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body">Department</Label>
              <Input value={editing.department || ""} onChange={(e) => setEditing({ ...editing, department: e.target.value })} className="font-body" />
            </div>
            <div>
              <Label className="font-body">Location</Label>
              <Input value={editing.location || ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="font-body" />
            </div>
            <div>
              <Label className="font-body">Employment Type</Label>
              <Input value={editing.employment_type || ""} onChange={(e) => setEditing({ ...editing, employment_type: e.target.value })} className="font-body" />
            </div>
            <div className="md:col-span-2">
              <Label className="font-body">Short description (shown on careers list)</Label>
              <Textarea value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} rows={2} className="font-body" />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <Switch checked={editing.is_published} onCheckedChange={(c) => setEditing({ ...editing, is_published: c })} id="pub" />
              <Label htmlFor="pub" className="font-body cursor-pointer">Published (visible on careers page)</Label>
              <div className="ml-auto flex items-center gap-2">
                <Label className="font-body text-sm">Sort order</Label>
                <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="w-20 font-body" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-lg">Sectioned description</h3>
            <Button type="button" size="sm" onClick={addBlock}><Plus className="w-4 h-4 mr-1" /> Add section</Button>
          </div>
          {editing.description.map((b, i) => (
            <div key={i} className="bg-muted/40 border border-border rounded-md p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Input value={b.heading} onChange={(e) => updateDesc(i, { heading: e.target.value })} placeholder="Section heading" className="font-body" />
                <Button type="button" variant="ghost" size="sm" onClick={() => removeBlock(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
              <Textarea value={b.body} onChange={(e) => updateDesc(i, { body: e.target.value })} rows={4} placeholder="Section content" className="font-body" />
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <FormBuilder value={editing.form_schema} onChange={(s) => setEditing({ ...editing, form_schema: s })} />
        </div>
      </div>
    );
  }

  // ============ LIST VIEW ============
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-lg">Jobs</h2>
          <p className="text-xs text-muted-foreground font-body">Manage open roles, descriptions and per-job application forms.</p>
        </div>
        <Button onClick={() => setEditing(emptyJob())}>
          <Plus className="w-4 h-4 mr-1" /> New Job
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading…</div>
        ) : jobs.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No jobs yet. Create your first role.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-body">Title</th>
                <th className="px-4 py-3 font-body">Category</th>
                <th className="px-4 py-3 font-body">Status</th>
                <th className="px-4 py-3 font-body">Order</th>
                <th className="px-4 py-3 font-body text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t border-border">
                  <td className="px-4 py-3 font-body">
                    <div className="font-medium">{job.title}</div>
                    <div className="text-xs text-muted-foreground font-mono">/{job.slug}</div>
                  </td>
                  <td className="px-4 py-3 font-body">{job.category}</td>
                  <td className="px-4 py-3">
                    <Badge variant={job.is_published ? "default" : "outline"} className="text-xs">
                      {job.is_published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-body">{job.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => togglePublish(job)} title={job.is_published ? "Unpublish" : "Publish"}>
                        {job.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditing({ ...job, description: job.description || [], form_schema: job.form_schema || [] })}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeJob(job)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
