import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";

const AssignmentSubmit = () => {
  const { token } = useParams<{ token: string }>();
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !link.trim()) {
      setError("Please share either notes or a link to your work.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const { data, error } = await supabase.functions.invoke("submit-assignment", {
      body: { token, payload: { text, link, submitted_at: new Date().toISOString() } },
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
            <h1 className="font-display text-2xl font-semibold">Submit your assignment</h1>
            <p className="text-muted-foreground text-sm font-body">
              Share a link to your work and any notes for the reviewers.
            </p>

            <div>
              <Label>Link to your work (optional if notes provided)</Label>
              <Input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Walk us through your approach..." />
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
