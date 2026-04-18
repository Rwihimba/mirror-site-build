import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, Trash2, Eye, FileText } from "lucide-react";

interface PipelineRow {
  application_id: string;
  stage: string;
  submission_payload: Record<string, unknown> | null;
  submission_token: string | null;
  assignment_due_at: string | null;
  meeting_scheduled_at: string | null;
}

interface ApplicationRow {
  id: string;
  job_id: string;
  applicant_name: string | null;
  applicant_email: string | null;
  responses: Record<string, unknown>;
  cv_path: string | null;
  status: string;
  created_at: string;
}

interface JobLite { id: string; title: string; pipeline_enabled: boolean; }

const STATUSES = ["new", "reviewing", "interview", "rejected", "hired"];

export function ApplicantsManager() {
  const { toast } = useToast();
  const [apps, setApps] = useState<ApplicationRow[]>([]);
  const [jobs, setJobs] = useState<JobLite[]>([]);
  const [filterJob, setFilterJob] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ApplicationRow | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const [aRes, jRes] = await Promise.all([
      supabase.from("job_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("jobs").select("id, title").order("title"),
    ]);
    setApps((aRes.data as unknown as ApplicationRow[]) || []);
    setJobs((jRes.data as unknown as JobLite[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const jobMap = useMemo(() => Object.fromEntries(jobs.map((j) => [j.id, j.title])), [jobs]);
  const filtered = filterJob === "all" ? apps : apps.filter((a) => a.job_id === filterJob);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("job_applications").update({ status }).eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setApps((p) => p.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    const { error } = await supabase.from("job_applications").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setApps((p) => p.filter((a) => a.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const downloadCv = async (path: string) => {
    const { data, error } = await supabase.storage.from("job-applications").createSignedUrl(path, 60);
    if (error || !data) return toast({ title: "Error", description: error?.message || "Could not generate link", variant: "destructive" });
    window.open(data.signedUrl, "_blank");
  };

  const exportCsv = () => {
    if (filtered.length === 0) return;
    const cols = new Set<string>(["job", "name", "email", "status", "submitted_at", "cv_path"]);
    filtered.forEach((a) => Object.keys(a.responses || {}).forEach((k) => cols.add(`response_${k}`)));
    const headers = Array.from(cols);
    const escape = (v: unknown) => {
      const s = v === null || v === undefined ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const rows = filtered.map((a) => {
      const base: Record<string, unknown> = {
        job: jobMap[a.job_id] || a.job_id,
        name: a.applicant_name,
        email: a.applicant_email,
        status: a.status,
        submitted_at: a.created_at,
        cv_path: a.cv_path,
      };
      Object.entries(a.responses || {}).forEach(([k, v]) => { base[`response_${k}`] = v; });
      return headers.map((h) => escape(base[h])).join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={filterJob} onValueChange={setFilterJob}>
          <SelectTrigger className="w-64"><SelectValue placeholder="Filter by job" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All jobs</SelectItem>
            {jobs.map((j) => <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={exportCsv} disabled={filtered.length === 0}>
          <Download className="w-4 h-4 mr-1" /> Export CSV
        </Button>
        <span className="text-xs text-muted-foreground font-body ml-auto">{filtered.length} application{filtered.length === 1 ? "" : "s"}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No applications yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-body">Applicant</th>
                  <th className="px-4 py-3 font-body">Role</th>
                  <th className="px-4 py-3 font-body">Status</th>
                  <th className="px-4 py-3 font-body">Date</th>
                  <th className="px-4 py-3 font-body text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className={`border-t border-border ${selected?.id === a.id ? "bg-muted/40" : ""}`}>
                    <td className="px-4 py-3 font-body">
                      <div className="font-medium">{a.applicant_name || "—"}</div>
                      <div className="text-xs text-muted-foreground">{a.applicant_email || ""}</div>
                    </td>
                    <td className="px-4 py-3 font-body text-xs">{jobMap[a.job_id] || "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="capitalize text-xs">{a.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setSelected(a)}><Eye className="w-4 h-4" /></Button>
                        {a.cv_path && (
                          <Button variant="ghost" size="sm" onClick={() => downloadCv(a.cv_path!)} title="Download CV">
                            <FileText className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => remove(a.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          {selected ? (
            <div className="bg-card border border-border rounded-lg p-6 sticky top-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold">{selected.applicant_name || "Applicant"}</h3>
                <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v)}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground font-body">
                <div>Role: <span className="text-foreground">{jobMap[selected.job_id] || "—"}</span></div>
                <div>Email: <span className="text-foreground">{selected.applicant_email || "—"}</span></div>
              </div>

              {selected.cv_path && (
                <Button variant="outline" size="sm" onClick={() => downloadCv(selected.cv_path!)} className="w-full">
                  <Download className="w-4 h-4 mr-1" /> Download CV
                </Button>
              )}

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {Object.entries(selected.responses || {}).map(([k, v]) => {
                  const isFile = v && typeof v === "object" && "path" in (v as object);
                  return (
                    <div key={k} className="text-sm">
                      <div className="text-xs text-muted-foreground font-body capitalize">{k.replace(/_/g, " ")}</div>
                      {isFile ? (
                        <button
                          className="text-primary underline text-sm"
                          onClick={() => downloadCv((v as { path: string }).path)}
                        >
                          {(v as { fileName?: string }).fileName || "Download file"}
                        </button>
                      ) : (
                        <div className="font-body whitespace-pre-wrap">
                          {Array.isArray(v) ? v.join(", ") : String(v ?? "—")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-muted-foreground">Submitted: {new Date(selected.created_at).toLocaleString()}</p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-6 text-center text-sm text-muted-foreground">
              Select an application to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
