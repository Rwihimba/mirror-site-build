import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle2, FileText, Download } from "lucide-react";
import { SEO } from "@/components/SEO";

interface Context {
  candidate_name: string | null;
  job_title: string | null;
  assignment_instructions: string | null;
  assignment_pdf_url: string | null;
  assignment_link: string | null;
  due_at: string | null;
}

const AssignmentSubmit = () => {
  const { token } = useParams<{ token: string }>();
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ctx, setCtx] = useState<Context | null>(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const { data } = await supabase
        .from("candidate_pipeline")
        .select("assignment_due_at, job_applications(applicant_name, jobs(title, assignment_instructions, assignment_pdf_path, assignment_link))")
        .eq("submission_token", token)
        .maybeSingle();
      if (!data) return;
      const ja: any = data.job_applications;
      const job: any = ja?.jobs;
      let pdfUrl: string | null = null;
      if (job?.assignment_pdf_path) {
        const { data: pub } = supabase.storage.from("assignment-files").getPublicUrl(job.assignment_pdf_path);
        pdfUrl = pub.publicUrl;
      }
      setCtx({
        candidate_name: ja?.applicant_name ?? null,
        job_title: job?.title ?? null,
        assignment_instructions: job?.assignment_instructions ?? null,
        assignment_pdf_url: pdfUrl,
        assignment_link: job?.assignment_link ?? null,
        due_at: data.assignment_due_at ?? null,
      });
    })();
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !link.trim() && !file) {
      setError("Please share notes, a link, or upload your work.");
      return;
    }
    setSubmitting(true);
    setError(null);

    let file_path: string | null = null;
    let file_name: string | null = null;
    if (file) {
      const path = `${token}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("assignment-submissions").upload(path, file);
      if (upErr) {
        setSubmitting(false);
        setError(`Upload failed: ${upErr.message}`);
        return;
      }
      file_path = path;
      file_name = file.name;
    }

    const { data, error } = await supabase.functions.invoke("submit-assignment", {
      body: { token, payload: { text, link, file_path, file_name, submitted_at: new Date().toISOString() } },
    });
    setSubmitting(false);
    if (error || (data as any)?.error) setError((data as any)?.error || error?.message || "Submission failed.");
    else setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <SEO title="Submit Assignment | MineTech" description="Submit your assignment for the MineTech recruitment process." />
      <div className="max-w-xl w-full bg-card border border-border rounded-lg p-8">
        {submitted ? (
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <h1 className="font-display text-2xl font-semibold">Submission received</h1>
            <p className="text-muted-foreground font-body">
              Thank you. We'll review your work and email you next steps shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <h1 className="font-display text-2xl font-semibold">Submit your assignment</h1>
              {ctx?.job_title && (
                <p className="text-sm text-muted-foreground font-body mt-1">
                  {ctx.candidate_name ? `${ctx.candidate_name} · ` : ""}{ctx.job_title}
                </p>
              )}
              {ctx?.due_at && (
                <p className="text-xs text-muted-foreground mt-1">
                  Deadline: {new Date(ctx.due_at).toLocaleString()}
                </p>
              )}
            </div>

            {(ctx?.assignment_instructions || ctx?.assignment_pdf_url || ctx?.assignment_link) && (
              <div className="bg-muted/50 border border-border rounded-md p-4 space-y-3">
                <h2 className="font-display font-semibold text-sm">Assignment brief</h2>
                {ctx.assignment_instructions && (
                  <p className="text-sm font-body whitespace-pre-wrap">{ctx.assignment_instructions}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {ctx.assignment_pdf_url && (
                    <a href={ctx.assignment_pdf_url} target="_blank" rel="noopener noreferrer">
                      <Button type="button" variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" /> Download PDF brief
                      </Button>
                    </a>
                  )}
                  {ctx.assignment_link && (
                    <a href={ctx.assignment_link} target="_blank" rel="noopener noreferrer">
                      <Button type="button" variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" /> Open assignment link
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            )}

            <div>
              <Label>Upload your work (PDF or doc)</Label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.zip,.png,.jpg"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file && <p className="text-xs text-muted-foreground mt-1">📎 {file.name}</p>}
            </div>
            <div>
              <Label>Or link to your work</Label>
              <Input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="Walk us through your approach..." />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit assignment"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AssignmentSubmit;
