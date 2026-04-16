import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

export type FormFieldDef = {
  id: string;
  type: "text" | "email" | "phone" | "textarea" | "file" | "select" | "radio" | "checkbox";
  label: string;
  required?: boolean;
  options?: string[];
  accept?: string;
  placeholder?: string;
};

interface DynamicApplicationFormProps {
  jobId: string;
  jobTitle: string;
  schema: FormFieldDef[];
}

export function DynamicApplicationForm({ jobId, jobTitle, schema }: DynamicApplicationFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Record<string, unknown>>({});

  const setVal = (id: string, v: unknown) => setValues((p) => ({ ...p, [id]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    for (const f of schema) {
      if (!f.required) continue;
      const v = values[f.id];
      if (f.type === "checkbox") {
        if (!Array.isArray(v) || v.length === 0) {
          toast({ title: "Required field missing", description: f.label, variant: "destructive" });
          return;
        }
      } else if (f.type === "file") {
        if (!(v instanceof File)) {
          toast({ title: "Required file missing", description: f.label, variant: "destructive" });
          return;
        }
      } else if (!v || String(v).trim() === "") {
        toast({ title: "Required field missing", description: f.label, variant: "destructive" });
        return;
      }
    }

    setSubmitting(true);
    try {
      // Upload any file fields
      let cvPath: string | null = null;
      const responses: Record<string, unknown> = {};
      for (const f of schema) {
        const v = values[f.id];
        if (f.type === "file" && v instanceof File) {
          const ext = v.name.split(".").pop() || "bin";
          const path = `applications/${jobId}/${crypto.randomUUID()}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from("job-applications")
            .upload(path, v, { upsert: false, contentType: v.type || undefined });
          if (upErr) throw upErr;
          responses[f.id] = { fileName: v.name, path };
          if (f.id === "cv" || !cvPath) cvPath = path;
        } else if (v !== undefined) {
          responses[f.id] = v;
        }
      }

      const applicantName = (responses["name"] as string) || "";
      const applicantEmail = (responses["email"] as string) || "";

      const { error: insErr } = await supabase.from("job_applications").insert({
        job_id: jobId,
        applicant_name: applicantName,
        applicant_email: applicantEmail,
        responses: responses as never,
        cv_path: cvPath,
      });
      if (insErr) throw insErr;

      setSubmitted(true);
      toast({ title: "Application submitted", description: `Thank you for applying for ${jobTitle}.` });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Please try again.";
      toast({ title: "Submission failed", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-secondary border border-border rounded-lg p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-display mb-2">Application Received</h3>
        <p className="text-muted-foreground font-body">
          Thank you for applying for <span className="font-medium text-foreground">{jobTitle}</span>. Our team will review and reach out soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6 md:p-8">
      <div>
        <h3 className="text-2xl font-display mb-1">Apply for this role</h3>
        <p className="text-sm text-muted-foreground font-body">All required fields are marked with *</p>
      </div>

      {schema.map((f) => {
        const id = `f-${f.id}`;
        const labelEl = (
          <Label htmlFor={id} className="font-body">
            {f.label}{f.required && " *"}
          </Label>
        );

        if (f.type === "textarea") {
          return (
            <div key={f.id} className="space-y-2">
              {labelEl}
              <Textarea
                id={id}
                rows={4}
                placeholder={f.placeholder}
                onChange={(e) => setVal(f.id, e.target.value)}
                className="font-body"
              />
            </div>
          );
        }

        if (f.type === "file") {
          return (
            <div key={f.id} className="space-y-2">
              {labelEl}
              <Input
                id={id}
                type="file"
                accept={f.accept}
                onChange={(e) => setVal(f.id, e.target.files?.[0] ?? null)}
                className="font-body cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>
          );
        }

        if (f.type === "select") {
          return (
            <div key={f.id} className="space-y-2">
              {labelEl}
              <Select onValueChange={(v) => setVal(f.id, v)}>
                <SelectTrigger className="font-body"><SelectValue placeholder="Select an option" /></SelectTrigger>
                <SelectContent>
                  {(f.options || []).map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }

        if (f.type === "radio") {
          return (
            <div key={f.id} className="space-y-2">
              {labelEl}
              <RadioGroup onValueChange={(v) => setVal(f.id, v)} className="space-y-2">
                {(f.options || []).map((o) => (
                  <div key={o} className="flex items-center gap-2">
                    <RadioGroupItem id={`${id}-${o}`} value={o} />
                    <Label htmlFor={`${id}-${o}`} className="font-body font-normal">{o}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          );
        }

        if (f.type === "checkbox") {
          const current = (values[f.id] as string[]) || [];
          return (
            <div key={f.id} className="space-y-2">
              {labelEl}
              <div className="space-y-2">
                {(f.options || []).map((o) => {
                  const checked = current.includes(o);
                  return (
                    <div key={o} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${o}`}
                        checked={checked}
                        onCheckedChange={(c) => {
                          const next = c ? [...current, o] : current.filter((x) => x !== o);
                          setVal(f.id, next);
                        }}
                      />
                      <Label htmlFor={`${id}-${o}`} className="font-body font-normal">{o}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // text / email / phone
        return (
          <div key={f.id} className="space-y-2">
            {labelEl}
            <Input
              id={id}
              type={f.type === "email" ? "email" : f.type === "phone" ? "tel" : "text"}
              placeholder={f.placeholder}
              onChange={(e) => setVal(f.id, e.target.value)}
              className="font-body"
            />
          </div>
        );
      })}

      <Button type="submit" disabled={submitting} className="w-full font-body">
        {submitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
