import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, ChevronRight, X } from "lucide-react";

type Stage = "applied" | "assignment_sent" | "assignment_submitted" | "meeting_scheduled" | "completed" | "rejected";

const STAGES: { key: Stage; label: string }[] = [
  { key: "applied", label: "Applied" },
  { key: "assignment_sent", label: "Assignment Sent" },
  { key: "assignment_submitted", label: "Submitted" },
  { key: "meeting_scheduled", label: "Meeting Scheduled" },
  { key: "completed", label: "Completed" },
  { key: "rejected", label: "Rejected" },
];

interface Candidate {
  id: string;
  application_id: string;
  stage: Stage;
  assignment_due_at: string | null;
  meeting_scheduled_at: string | null;
  submission_token: string;
  job_applications: {
    applicant_name: string | null;
    applicant_email: string | null;
    created_at: string;
    jobs: { title: string } | null;
  };
}

interface LogEntry {
  id: string;
  template_key: string;
  recipient: string;
  subject: string | null;
  status: string;
  sent_at: string;
}

export function CandidatesBoard() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("candidate_pipeline")
      .select("id, application_id, stage, assignment_due_at, meeting_scheduled_at, submission_token, job_applications(applicant_name, applicant_email, created_at, jobs(title))")
      .order("created_at", { ascending: false });
    if (data) setCandidates(data as unknown as Candidate[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase.channel("pipeline-board")
      .on("postgres_changes", { event: "*", schema: "public", table: "candidate_pipeline" }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  useEffect(() => {
    if (!selected) { setLogs([]); return; }
    supabase.from("pipeline_email_log").select("*").eq("application_id", selected.application_id).order("sent_at", { ascending: false })
      .then(({ data }) => { if (data) setLogs(data as LogEntry[]); });
  }, [selected]);

  const advance = async (c: Candidate, stage: Stage) => {
    const { error } = await supabase.from("candidate_pipeline").update({ stage }).eq("id", c.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Updated" }); load(); }
  };

  const resend = async (application_id: string, template_key: string) => {
    const { error } = await supabase.functions.invoke("send-pipeline-email", {
      body: { application_id, template_key },
    });
    toast({
      title: error ? "Error" : "Email queued",
      description: error?.message ?? `Sent ${template_key}`,
      variant: error ? "destructive" : "default",
    });
  };

  const grouped = STAGES.reduce<Record<Stage, Candidate[]>>((acc, s) => {
    acc[s.key] = candidates.filter(c => c.stage === s.key);
    return acc;
  }, {} as Record<Stage, Candidate[]>);

  if (loading) return <div className="p-6 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAGES.map(s => (
          <div key={s.key} className="bg-card rounded-lg border border-border p-3 min-h-[200px]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display text-sm font-semibold">{s.label}</h4>
              <Badge variant="outline" className="text-xs">{grouped[s.key].length}</Badge>
            </div>
            <div className="space-y-2">
              {grouped[s.key].map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="w-full text-left p-2 rounded bg-background hover:bg-muted border border-border text-xs transition"
                >
                  <div className="font-medium font-body truncate">{c.job_applications.applicant_name || "Anonymous"}</div>
                  <div className="text-muted-foreground truncate">{c.job_applications.jobs?.title}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-lg">{selected.job_applications.applicant_name}</h3>
              <p className="text-sm text-muted-foreground">{selected.job_applications.applicant_email} · {selected.job_applications.jobs?.title}</p>
              <Badge className="mt-2 capitalize">{selected.stage.replace(/_/g, " ")}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelected(null)}><X className="w-4 h-4" /></Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-display font-semibold text-sm mb-2">Move to stage</h4>
              <div className="flex flex-wrap gap-2">
                {STAGES.map(s => (
                  <Button key={s.key} size="sm" variant={selected.stage === s.key ? "default" : "outline"} onClick={() => advance(selected, s.key)}>
                    {s.label}
                  </Button>
                ))}
              </div>

              <h4 className="font-display font-semibold text-sm mt-4 mb-2">Resend email</h4>
              <div className="flex flex-wrap gap-2">
                {["assignment_invite", "assignment_reminder", "submission_received", "schedule_meeting", "schedule_reminder"].map(t => (
                  <Button key={t} size="sm" variant="outline" onClick={() => resend(selected.application_id, t)}>
                    <Mail className="w-3 h-3 mr-1" /> {t.replace(/_/g, " ")}
                  </Button>
                ))}
              </div>

              {selected.assignment_due_at && (
                <p className="text-xs text-muted-foreground mt-4">Deadline: {new Date(selected.assignment_due_at).toLocaleString()}</p>
              )}
            </div>

            <div>
              <h4 className="font-display font-semibold text-sm mb-2">Email Timeline</h4>
              <div className="space-y-2 max-h-72 overflow-auto">
                {logs.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No emails sent yet.</p>
                ) : logs.map(l => (
                  <div key={l.id} className="text-xs border-l-2 border-primary pl-3 py-1">
                    <div className="font-medium font-body flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> {l.subject || l.template_key}
                    </div>
                    <div className="text-muted-foreground">{new Date(l.sent_at).toLocaleString()} · {l.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
